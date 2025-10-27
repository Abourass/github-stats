# GitHub Stats

A TypeScript-based tool that generates beautiful SVG statistics cards and detailed HTML breakdowns for your GitHub profile.

## Features

- 📊 **Overview Card**: Display stars, forks, contributions, lines of code changed, repository views, and total repositories
- 🎨 **Languages Card**: Visual breakdown of programming languages used across your repositories
- 📈 **Detailed Breakdown**: Optional HTML report with per-repository statistics, language breakdowns, and contribution metrics
- 🌙 **Dark Mode Support**: SVG cards automatically adapt to GitHub's dark mode
- ⚡ **Rate Limit Handling**: Smart retry logic with exponential backoff and automatic rate limit detection
- 🔄 **GitHub Actions**: Automated daily updates via workflow

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-stats.git
   cd github-stats
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create a GitHub Personal Access Token**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token with `repo` and `read:user` scopes
   - Copy the token

4. **Set up environment variables**
   Create a .env file:
   ```env
   ACCESS_TOKEN=your_github_token_here
   GITHUB_ACTOR=your_github_username
   EXCLUDED=repo1,repo2  # Optional: comma-separated list of repos to exclude
   EXCLUDED_LANGS=HTML,CSS  # Optional: comma-separated list of languages to exclude
   EXCLUDE_FORKED_REPOS=true  # Optional: exclude forked repositories
   ```

5. **Configure package.json (optional)**
   ```json
   {
     "github-stats": {
       "omitRepos": ["repo-to-exclude"],
       "extra-stats": true
     }
   }
   ```

## Usage

### Local Generation

```bash
pnpm start
```

This will generate:
- overview.svg - Overview statistics card
- languages.svg - Language breakdown card
- `generated/breakdown.html` - Detailed HTML report (if `extra-stats` is enabled)

### GitHub Actions (Automated)

The workflow runs automatically:
- Daily at 00:05 UTC
- On every push to `master`
- Manually via workflow dispatch

Add your `ACCESS_TOKEN` to repository secrets:
1. Go to repository Settings > Secrets and variables > Actions
2. Add `ACCESS_TOKEN` with your GitHub personal access token

### Display in README

```markdown
![GitHub Stats](./generated/overview.svg#gh-dark-mode-only)
![Languages](./generated/languages.svg#gh-dark-mode-only)
```

## Configuration

- **`EXCLUDED`**: Comma-separated list of repositories to exclude from stats
- **`EXCLUDED_LANGS`**: Comma-separated list of languages to exclude from language breakdown
- **`EXCLUDE_FORKED_REPOS`**: Set to `true` to exclude repositories you've forked
- **`extra-stats`**: Enable detailed per-repository HTML breakdown in package.json

## Credits

Based on [jstrieb/github-stats](https://github.com/jstrieb/github-stats) with TypeScript rewrite and enhanced features.

## License

MIT
