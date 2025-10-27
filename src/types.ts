export interface Repository {
  nameWithOwner: string;
  stargazers: {
    totalCount: number;
  };
  forkCount: number;
  languages: {
    edges: Array<{
      size: number;
      node: {
        name: string;
        color: string | null;
      };
    }>;
  };
}

export interface RepoPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface RepositoriesResponse {
  viewer: {
    login: string;
    name: string | null;
    repositories: {
      pageInfo: RepoPageInfo;
      nodes: Repository[];
    };
    repositoriesContributedTo: {
      pageInfo: RepoPageInfo;
      nodes: Repository[];
    };
  };
}

export interface ContributionYear {
  year: number;
}

export interface ContributionYearsResponse {
  viewer: {
    contributionsCollection: {
      contributionYears: number[];
    };
  };
}

export interface ContributionsByYearResponse {
  viewer: {
    [key: string]: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
  };
}

export interface ContributorStats {
  author: {
    login: string;
  } | null;
  weeks: Array<{
    a: number; // additions
    d: number; // deletions
    c: number; // commits
  }>;
}

export interface TrafficViews {
  views: Array<{
    count: number;
    uniques: number;
  }>;
}

export interface LanguageStats {
  [language: string]: {
    size: number;
    occurrences: number;
    color: string | null;
    prop?: number;
  };
}

export interface StatsData {
  name: string;
  stargazers: number;
  forks: number;
  totalContributions: number;
  linesChanged: [number, number]; // [additions, deletions]
  views: number;
  repos: string[];
  languages: LanguageStats;
}
