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
  private rateLimitWarningThreshold = 100; // Warn when fewer than this many requests remain
  private lastRateLimitCheck = 0;
  private rateLimitCheckInterval = 60000; // Check rate limit every 60 seconds

  constructor(_username: string, accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
    this.graphqlClient = graphql.defaults({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  /**
   * Sleep for a specified number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Exponential backoff with jitter for retries
   */
  private calculateBackoff(attempt: number, baseDelay = 1000): number {
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), 32000);
    const jitter = Math.random() * 1000; // Add up to 1 second of jitter
    return exponentialDelay + jitter;
  }

  /**
   * Check rate limit status and wait if necessary
   */
  private async checkAndHandleRateLimit(): Promise<void> {
    const now = Date.now();
    
    // Only check periodically to avoid excessive API calls
    if (now - this.lastRateLimitCheck < this.rateLimitCheckInterval) {
      return;
    }

    try {
      const { data } = await this.octokit.rateLimit.get();
      this.lastRateLimitCheck = now;

      const core = data.resources.core;
      const resetTime = new Date(core.reset * 1000);
      const timeUntilReset = resetTime.getTime() - now;

      console.log(
        `📊 Rate Limit Status: ${core.remaining}/${core.limit} remaining (resets at ${resetTime.toLocaleTimeString()})`
      );

      // If we're running low on requests, warn the user
      if (core.remaining < this.rateLimitWarningThreshold) {
        console.warn(
          `⚠️  Low rate limit: ${core.remaining} requests remaining. Reset in ${Math.ceil(timeUntilReset / 60000)} minutes.`
        );
      }

      // If we're out of requests, wait until reset
      if (core.remaining === 0) {
        const waitTime = timeUntilReset + 5000; // Add 5 seconds buffer
        console.warn(
          `⏸️  Rate limit exceeded. Waiting ${Math.ceil(waitTime / 60000)} minutes until reset...`
        );
        await this.sleep(waitTime);
      }
    } catch (error: any) {
      console.error('Failed to check rate limit:', error.message);
      // Continue anyway - don't block on rate limit checks
    }
  }

  /**
   * Retry wrapper with exponential backoff and rate limit handling
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    operationName: string,
    maxRetries = 5
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await this.checkAndHandleRateLimit();
        return await fn();
      } catch (error: any) {
        lastError = error;

        // Handle rate limit errors specifically
        if (error.status === 403 && error.message?.includes('rate limit')) {
          const resetTime = error.response?.headers['x-ratelimit-reset'];
          if (resetTime) {
            const waitTime = parseInt(resetTime) * 1000 - Date.now() + 5000;
            console.warn(
              `⏸️  Rate limit hit during ${operationName}. Waiting ${Math.ceil(waitTime / 60000)} minutes...`
            );
            await this.sleep(Math.max(waitTime, 0));
            continue;
          }
        }

        // Handle secondary rate limit (abuse detection)
        if (error.status === 403 && error.message?.includes('secondary rate limit')) {
          const retryAfter = error.response?.headers['retry-after'];
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : this.calculateBackoff(attempt);
          console.warn(
            `⏸️  Secondary rate limit hit during ${operationName}. Waiting ${Math.ceil(waitTime / 1000)} seconds...`
          );
          await this.sleep(waitTime);
          continue;
        }

        // Handle 5xx server errors with backoff
        if (error.status >= 500 && error.status < 600) {
          if (attempt < maxRetries - 1) {
            const backoff = this.calculateBackoff(attempt);
            console.warn(
              `⚠️  Server error (${error.status}) during ${operationName}. Retrying in ${Math.ceil(backoff / 1000)}s... (attempt ${attempt + 1}/${maxRetries})`
            );
            await this.sleep(backoff);
            continue;
          }
        }

        // For other errors, don't retry
        if (error.status === 404 || error.status === 401) {
          throw error;
        }

        // Generic retry with backoff
        if (attempt < maxRetries - 1) {
          const backoff = this.calculateBackoff(attempt);
          console.warn(
            `⚠️  Error during ${operationName}: ${error.message}. Retrying in ${Math.ceil(backoff / 1000)}s... (attempt ${attempt + 1}/${maxRetries})`
          );
          await this.sleep(backoff);
        }
      }
    }

    throw new Error(
      `Failed ${operationName} after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`
    );
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

    return this.retryWithBackoff(
      async () => {
        return await this.graphqlClient<RepositoriesResponse>(query, {
          ownedCursor: ownedCursor || null,
          contribCursor: contribCursor || null,
        });
      },
      'queryRepositories'
    );
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

    return this.retryWithBackoff(
      async () => {
        const result = await this.graphqlClient<ContributionYearsResponse>(query);
        return result.viewer.contributionsCollection.contributionYears;
      },
      'queryContributionYears',
      10 // Fewer retries for this simple query
    );
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

    return this.retryWithBackoff(
      async () => {
        const result = await this.graphqlClient<ContributionsByYearResponse>(query);
        let total = 0;

        for (const year of years) {
          const yearData = result.viewer[`year${year}`];
          if (yearData) {
            total += yearData.contributionCalendar.totalContributions;
          }
        }

        return total;
      },
      'queryContributionsByYears',
      3
    );
  }

  /**
   * Get contributor statistics for a repository (with retry logic for 202 responses)
   */
  async getContributorStats(repoFullName: string): Promise<ContributorStats[]> {
    const [owner, repo] = repoFullName.split('/');

    return this.retryWithBackoff(
      async () => {
        // Special handling for 202 responses (computing stats)
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
          try {
            const { data, status } = await this.octokit.repos.getContributorsStats({
              owner,
              repo,
            });

            if (status === 202) {
              if (attempt === 0) {
                console.log(`Repository ${repoFullName} computing stats (202)...`);
              }
              await this.sleep(2000);
              continue;
            }

            return (data as ContributorStats[]) || [];
          } catch (error: any) {
            if (error.status === 404 || error.status === 403) {
              // Repo doesn't exist or no access
              return [];
            }
            // Let outer retry handler deal with other errors
            throw error;
          }
        }

        console.warn(
          `⚠️  Too many 202 responses for ${repoFullName}. Data will be incomplete.`
        );
        return [];
      },
      `getContributorStats(${repoFullName})`,
      3 // Fewer retries since we have internal 202 handling
    );
  }

  /**
   * Get repository traffic views (last 14 days)
   */
  async getRepositoryViews(repoFullName: string): Promise<number> {
    const [owner, repo] = repoFullName.split('/');

    return this.retryWithBackoff(
      async () => {
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
          throw error;
        }
      },
      `getRepositoryViews(${repoFullName})`,
      3
    );
  }

  /**
   * Get repository details
   */
  async getRepositoryDetails(repoFullName: string): Promise<any> {
    const [owner, repo] = repoFullName.split('/');
    
    return this.retryWithBackoff(
      async () => {
        try {
          const { data } = await this.octokit.repos.get({ owner, repo });
          return data;
        } catch (error: any) {
          if (error.status === 404 || error.status === 403) {
            return null;
          }
          throw error;
        }
      },
      `getRepositoryDetails(${repoFullName})`,
      3
    );
  }

  /**
   * Get repository languages
   */
  async getRepositoryLanguages(repoFullName: string): Promise<Record<string, number>> {
    const [owner, repo] = repoFullName.split('/');
    
    return this.retryWithBackoff(
      async () => {
        try {
          const { data } = await this.octokit.repos.listLanguages({ owner, repo });
          return data;
        } catch (error: any) {
          if (error.status === 404 || error.status === 403) {
            return {};
          }
          throw error;
        }
      },
      `getRepositoryLanguages(${repoFullName})`,
      3
    );
  }
}
