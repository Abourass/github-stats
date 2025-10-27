import { GitHubClient } from './github-client.js';
import type { LanguageStats, StatsData, RepoBreakdown } from './types.js';

export interface StatsOptions {
  excludeRepos?: Set<string>;
  excludeLangs?: Set<string>;
  ignoreForkedRepos?: boolean;
  collectDetailedBreakdown?: boolean;
}

export class Stats {
  private client: GitHubClient;
  private username: string;
  private excludeRepos: Set<string>;
  private excludeLangs: Set<string>;
  private ignoreForkedRepos: boolean;
  private collectDetailedBreakdown: boolean;

  constructor(username: string, accessToken: string, options: StatsOptions = {}) {
    this.username = username;
    this.client = new GitHubClient(username, accessToken);
    this.excludeRepos = options.excludeRepos || new Set();
    this.excludeLangs = options.excludeLangs || new Set();
    this.ignoreForkedRepos = options.ignoreForkedRepos || false;
    this.collectDetailedBreakdown = options.collectDetailedBreakdown || false;
  }

  /**
   * Collect all statistics from GitHub
   */
  async collect(): Promise<StatsData> {
    let name = this.username;
    let stargazers = 0;
    let forks = 0;
    const languages: LanguageStats = {};
    const repos = new Set<string>();

    const excludeLangsLower = new Set(
      Array.from(this.excludeLangs).map((lang) => lang.toLowerCase())
    );

    // Paginate through all repositories
    let ownedCursor: string | undefined;
    let contribCursor: string | undefined;

    while (true) {
      const result = await this.client.queryRepositories(ownedCursor, contribCursor);

      // Get user's name
      if (result.viewer.name) {
        name = result.viewer.name;
      } else {
        name = result.viewer.login;
      }

      const ownedRepos = result.viewer.repositories.nodes;
      const contribRepos = this.ignoreForkedRepos
        ? []
        : result.viewer.repositoriesContributedTo.nodes;

      const allRepos = [...ownedRepos, ...contribRepos];

      for (const repo of allRepos) {
        if (!repo) continue;

        const repoName = repo.nameWithOwner;

        // Skip if already processed or excluded
        if (repos.has(repoName) || this.excludeRepos.has(repoName)) {
          continue;
        }

        repos.add(repoName);
        stargazers += repo.stargazers.totalCount;
        forks += repo.forkCount;

        // Process languages
        for (const langEdge of repo.languages.edges) {
          const langName = langEdge.node.name;
          const langSize = langEdge.size;
          const langColor = langEdge.node.color;

          if (excludeLangsLower.has(langName.toLowerCase())) {
            continue;
          }

          if (languages[langName]) {
            languages[langName].size += langSize;
            languages[langName].occurrences += 1;
          } else {
            languages[langName] = {
              size: langSize,
              occurrences: 1,
              color: langColor,
            };
          }
        }
      }

      // Check if we need to paginate further
      const hasMoreOwned = result.viewer.repositories.pageInfo.hasNextPage;
      const hasMoreContrib =
        result.viewer.repositoriesContributedTo.pageInfo.hasNextPage;

      if (hasMoreOwned || hasMoreContrib) {
        ownedCursor = result.viewer.repositories.pageInfo.endCursor || undefined;
        contribCursor =
          result.viewer.repositoriesContributedTo.pageInfo.endCursor || undefined;
      } else {
        break;
      }
    }

    // Calculate language proportions
    const languagesTotal = Object.values(languages).reduce(
      (sum, lang) => sum + lang.size,
      0
    );

    for (const lang of Object.values(languages)) {
      lang.prop = (lang.size / languagesTotal) * 100;
    }

    // Get total contributions
    const contributionYears = await this.client.queryContributionYears();
    const totalContributions =
      await this.client.queryContributionsByYears(contributionYears);

    // Get lines changed
    const linesChanged = await this.calculateLinesChanged(Array.from(repos));

    // Get repository views
    const views = await this.calculateViews(Array.from(repos));

    // Collect detailed breakdown if requested
    let repoBreakdowns: RepoBreakdown[] | undefined;
    if (this.collectDetailedBreakdown) {
      repoBreakdowns = await this.collectRepoBreakdowns(Array.from(repos));
    }

    return {
      name,
      stargazers,
      forks,
      totalContributions,
      linesChanged,
      views,
      repos: Array.from(repos),
      languages,
      repoBreakdowns,
    };
  }

  /**
   * Collect detailed breakdown for each repository
   */
  private async collectRepoBreakdowns(repos: string[]): Promise<RepoBreakdown[]> {
    const breakdowns: RepoBreakdown[] = [];

    // Process repos in batches
    const batchSize = 5;
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);
      
      const results = await Promise.all(
        batch.map(async (repoName) => {
          // Get repo details
          const repoData = await this.client.getRepositoryDetails(repoName);
          if (!repoData) return null;

          // Get contributor stats for this repo
          const contributorStats = await this.client.getContributorStats(repoName);
          let additions = 0;
          let deletions = 0;
          let contributions = 0;

          for (const contributor of contributorStats) {
            if (contributor.author && contributor.author.login === this.username) {
              for (const week of contributor.weeks) {
                additions += week.a;
                deletions += week.d;
                contributions += week.c;
              }
            }
          }

          // Get views
          const views = await this.client.getRepositoryViews(repoName);

          // Get languages for this repo
          const repoLanguages: LanguageStats = {};
          const langData = await this.client.getRepositoryLanguages(repoName);
          const total = Object.values(langData).reduce((sum: number, size) => sum + size, 0);
          
          for (const [langName, langSize] of Object.entries(langData)) {
            repoLanguages[langName] = {
              size: langSize,
              occurrences: 1,
              color: null,
              prop: total > 0 ? (langSize / total) * 100 : 0,
            };
          }

          return {
            name: repoName,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            contributions,
            additions,
            deletions,
            views,
            languages: repoLanguages,
          };
        })
      );

      breakdowns.push(...results.filter((r): r is RepoBreakdown => r !== null));
    }

    return breakdowns.sort((a, b) => b.stars - a.stars);
  }

  /**
   * Calculate total lines added and deleted across all repositories
   */
  private async calculateLinesChanged(repos: string[]): Promise<[number, number]> {
    let additions = 0;
    let deletions = 0;

    // Process repos in batches to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map((repo) => this.client.getContributorStats(repo))
      );

      for (let j = 0; j < results.length; j++) {
        const stats = results[j];

        for (const contributor of stats) {
          if (!contributor.author || contributor.author.login !== this.username) {
            continue;
          }

          for (const week of contributor.weeks) {
            additions += week.a;
            deletions += week.d;
          }
        }
      }
    }

    return [additions, deletions];
  }

  /**
   * Calculate total repository views (last 14 days)
   */
  private async calculateViews(repos: string[]): Promise<number> {
    let totalViews = 0;

    // Process repos in batches
    const batchSize = 10;
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map((repo) => this.client.getRepositoryViews(repo))
      );

      totalViews += results.reduce((sum, views) => sum + views, 0);
    }

    return totalViews;
  }

  /**
   * Get a summary string of all statistics
   */
  async toString(): Promise<string> {
    const data = await this.collect();

    const languagesList = Object.entries(data.languages)
      .map(([lang, stats]) => `  - ${lang}: ${stats.prop?.toFixed(4)}%`)
      .join('\n');

    const linesTotal = data.linesChanged[0] + data.linesChanged[1];

    return `Name: ${data.name}
Stargazers: ${data.stargazers.toLocaleString()}
Forks: ${data.forks.toLocaleString()}
All-time contributions: ${data.totalContributions.toLocaleString()}
Repositories with contributions: ${data.repos.length}
Lines of code added: ${data.linesChanged[0].toLocaleString()}
Lines of code deleted: ${data.linesChanged[1].toLocaleString()}
Lines of code changed: ${linesTotal.toLocaleString()}
Project page views: ${data.views.toLocaleString()}
Languages:
${languagesList}`;
  }
}
