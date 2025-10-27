import { graphql } from '@octokit/graphql';
import { Octokit } from '@octokit/rest';
import type {
  RepositoriesResponse,
  ContributionYearsResponse,
  ContributionsByYearResponse,
  ContributorStats,
} from './types.js';

export class GitHubClient {
  private octokit: Octokit;
  private graphqlClient: typeof graphql;
  private maxRetries = 60;

  constructor(_username: string, accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
    this.graphqlClient = graphql.defaults({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  /**
   * Query GitHub GraphQL API for repositories overview
   */
  async queryRepositories(
    ownedCursor?: string,
    contribCursor?: string
  ): Promise<RepositoriesResponse> {
    const query = `
      query($ownedCursor: String, $contribCursor: String) {
        viewer {
          login
          name
          repositories(
            first: 100
            orderBy: { field: UPDATED_AT, direction: DESC }
            isFork: false
            after: $ownedCursor
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              nameWithOwner
              stargazers {
                totalCount
              }
              forkCount
              languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
          repositoriesContributedTo(
            first: 100
            includeUserRepositories: false
            orderBy: { field: UPDATED_AT, direction: DESC }
            contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY, PULL_REQUEST_REVIEW]
            after: $contribCursor
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              nameWithOwner
              stargazers {
                totalCount
              }
              forkCount
              languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      return await this.graphqlClient<RepositoriesResponse>(query, {
        ownedCursor: ownedCursor || null,
        contribCursor: contribCursor || null,
      });
    } catch (error) {
      console.error('GraphQL query failed for repositories:', error);
      throw error;
    }
  }

  /**
   * Get all years the user has contributed
   */
  async queryContributionYears(): Promise<number[]> {
    const query = `
      query {
        viewer {
          contributionsCollection {
            contributionYears
          }
        }
      }
    `;

    try {
      const result = await this.graphqlClient<ContributionYearsResponse>(query);
      return result.viewer.contributionsCollection.contributionYears;
    } catch (error) {
      console.error('Failed to fetch contribution years:', error);
      return [];
    }
  }

  /**
   * Get contributions for all years
   */
  async queryContributionsByYears(years: number[]): Promise<number> {
    if (years.length === 0) return 0;

    const yearQueries = years
      .map(
        (year) => `
      year${year}: contributionsCollection(
        from: "${year}-01-01T00:00:00Z"
        to: "${year + 1}-01-01T00:00:00Z"
      ) {
        contributionCalendar {
          totalContributions
        }
      }
    `
      )
      .join('\n');

    const query = `
      query {
        viewer {
          ${yearQueries}
        }
      }
    `;

    try {
      const result = await this.graphqlClient<ContributionsByYearResponse>(query);
      let total = 0;

      for (const year of years) {
        const yearData = result.viewer[`year${year}`];
        if (yearData) {
          total += yearData.contributionCalendar.totalContributions;
        }
      }

      return total;
    } catch (error) {
      console.error('Failed to fetch contributions by year:', error);
      return 0;
    }
  }

  /**
   * Get contributor statistics for a repository (with retry logic for 202 responses)
   */
  async getContributorStats(repoFullName: string): Promise<ContributorStats[]> {
    const [owner, repo] = repoFullName.split('/');

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const { data, status } = await this.octokit.repos.getContributorsStats({
          owner,
          repo,
        });

        if (status === 202) {
          console.log(`Repository ${repoFullName} returned 202. Retrying...`);
          await this.sleep(2000);
          continue;
        }

        return (data as ContributorStats[]) || [];
      } catch (error: any) {
        if (error.status === 404 || error.status === 403) {
          // Repo doesn't exist or no access
          return [];
        }
        console.error(`Failed to fetch contributor stats for ${repoFullName}:`, error.message);
        return [];
      }
    }

    console.warn(
      `Too many 202 responses for ${repoFullName}. Data will be incomplete.`
    );
    return [];
  }

  /**
   * Get repository traffic views (last 14 days)
   */
  async getRepositoryViews(repoFullName: string): Promise<number> {
    const [owner, repo] = repoFullName.split('/');

    try {
      const { data } = await this.octokit.repos.getViews({
        owner,
        repo,
      });

      return data.views.reduce((sum: number, view: any) => sum + view.count, 0);
    } catch (error: any) {
      if (error.status === 403 || error.status === 404) {
        // No access to traffic data or repo doesn't exist
        return 0;
      }
      console.error(`Failed to fetch views for ${repoFullName}:`, error.message);
      return 0;
    }
  }

  /**
   * Get repository details
   */
  async getRepositoryDetails(repoFullName: string): Promise<any> {
    const [owner, repo] = repoFullName.split('/');
    try {
      const { data } = await this.octokit.repos.get({ owner, repo });
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Get repository languages
   */
  async getRepositoryLanguages(repoFullName: string): Promise<Record<string, number>> {
    const [owner, repo] = repoFullName.split('/');
    try {
      const { data } = await this.octokit.repos.listLanguages({ owner, repo });
      return data;
    } catch {
      return {};
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
