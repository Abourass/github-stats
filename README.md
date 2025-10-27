# GitHub Stats Visualization# GitHub Stats Visualization# [GitHub Stats Visualization](https://github.com/jstrieb/github-stats)



<div align="center">



Generate beautiful visualizations of your GitHub statistics directly in your profile README! ✨<div align="center">> **🎉 Now powered by TypeScript + pnpm!** This project has been migrated from Python to TypeScript for better type safety, developer experience, and maintainability. We use pnpm for faster, more efficient package management. See [TYPESCRIPT_MIGRATION.md](TYPESCRIPT_MIGRATION.md) for details.



[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

[![pnpm](https://img.shields.io/badge/pnpm-9.12-orange?logo=pnpm)](https://pnpm.io/)

[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)Generate beautiful visualizations of your GitHub statistics directly in your profile README! ✨<!--

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

https://github.community/t/support-theme-context-for-images-in-light-vs-dark-mode/147981/84

</div>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)-->

## 📊 Example

[![pnpm](https://img.shields.io/badge/pnpm-9.12-orange?logo=pnpm)](https://pnpm.io/)<a href="https://github.com/jstrieb/github-stats">

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)<img src="https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-dark-mode-only" />

![GitHub Stats - Dark Mode](https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-dark-mode-only)

![GitHub Stats - Light Mode](https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-light-mode-only)[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)<img src="https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-dark-mode-only" />



![Top Languages - Dark Mode](https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-dark-mode-only)<img src="https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-light-mode-only" />

![Top Languages - Light Mode](https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-light-mode-only)

</div><img src="https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-light-mode-only" />

</div>

</a>

## ✨ Features

## 📊 Example

- 📈 **Comprehensive Statistics** - Stars, forks, contributions, lines changed, views, and more

- 🎨 **Beautiful SVG Visualizations** - Animated cards that adapt to light/dark themesGenerate visualizations of GitHub user and repository statistics with GitHub

- 🔒 **Private Repository Support** - Include stats from your private repos

- ⚡ **Fast & Efficient** - Built with TypeScript and pnpm for optimal performance<div align="center">Actions. Visualizations can include data for both private repositories, and for

- 🤖 **Fully Automated** - Runs daily via GitHub Actions, no server required

- 🎯 **Type-Safe** - Full TypeScript implementation with compile-time checks<a href="https://github.com/jstrieb/github-stats">repositories you have contributed to, but do not own.

- 📦 **Easy Setup** - Configure in minutes with GitHub Actions

<img src="https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-dark-mode-only" />

## 🚀 Quick Start

<img src="https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-dark-mode-only" />Generated images automatically switch between GitHub light theme and GitHub

### 1. Create a Personal Access Token

<img src="https://github.com/jstrieb/github-stats/blob/master/generated/overview.svg#gh-light-mode-only" />dark theme.

Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with the following permissions:

<img src="https://github.com/jstrieb/github-stats/blob/master/generated/languages.svg#gh-light-mode-only" />

- `read:user` - Read user profile data

- `repo` - Access repository data (including private repos)</a>## Background



> **Note**: It may take a few minutes for the token to become active after creation.</div>



### 2. Fork This RepositoryWhen someone views a profile on GitHub, it is often because they are curious



Click the **[Use this template](https://github.com/jstrieb/github-stats/generate)** button to create a copy of this repository.## ✨ Featuresabout a user's open source projects and contributions. Unfortunately, that



> **Important**: Use "Create a new repository" not "Fork" to get a clean copy without the commit history.user's stars, forks, and pinned repositories do not necessarily reflect the



### 3. Add Your Token as a Secret- 📈 **Comprehensive Statistics** - Stars, forks, contributions, lines changed, views, and morecontributions they make to private repositories. The data likewise does not



1. Go to your forked repository's **Settings** → **Secrets and variables** → **Actions**- 🎨 **Beautiful SVG Visualizations** - Animated cards that adapt to light/dark themespresent a complete picture of the user's total contributions beyond the current

2. Click **New repository secret**

3. Name: `ACCESS_TOKEN`- 🔒 **Private Repository Support** - Include stats from your private reposyear.

4. Value: Paste your personal access token

5. Click **Add secret**- ⚡ **Fast & Efficient** - Built with TypeScript and pnpm for optimal performance



### 4. Enable GitHub Actions- 🤖 **Fully Automated** - Runs daily via GitHub Actions, no server requiredThis project aims to collect a variety of profile and repository statistics



1. Go to the **Actions** tab in your repository- 🎯 **Type-Safe** - Full TypeScript implementation with compile-time checksusing the GitHub API. It then generates images that can be displayed in

2. Click **"I understand my workflows, go ahead and enable them"**

3. Click **"Generate Stats Images"** workflow- 📦 **Easy Setup** - Configure in minutes with GitHub Actionsrepository READMEs, or in a user's [Profile

4. Click **"Run workflow"** → **"Run workflow"**

README](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme).

### 5. Add Images to Your Profile

## 🚀 Quick Start

Once the workflow completes, add these to your profile README:

Since the project runs on GitHub Actions, no server is required to regularly

```markdown

![GitHub Stats](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/overview.svg#gh-dark-mode-only)### 1. Create a Personal Access Tokenregenerate the images with updated statistics. Likewise, since the user runs

![GitHub Stats](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/overview.svg#gh-light-mode-only)

the analysis code themselves via GitHub Actions, they can use their GitHub

![Top Languages](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/languages.svg#gh-dark-mode-only)

![Top Languages](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/languages.svg#gh-light-mode-only)Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with the following permissions:access token to collect statistics on private repositories that an external

```

- `read:user` - Read user profile dataservice would be unable to access.

**Replace `YOUR_USERNAME` with your GitHub username!**

- `repo` - Access repository data (including private repos)

## ⚙️ Configuration

## Disclaimer

### Environment Variables

> **Note**: It may take a few minutes for the token to become active after creation.

Configure the statistics generation by adding repository secrets:

If the project is used with an access token that has sufficient permissions to

| Variable | Description | Required | Example |

|----------|-------------|----------|---------|### 2. Fork This Repositoryread private repositories, it may leak details about those repositories in

| `ACCESS_TOKEN` | GitHub personal access token | ✅ Yes | `ghp_xxxxxxxxxxxx` |

| `GITHUB_ACTOR` | Your GitHub username | ✅ Yes | Automatically set by Actions |error messages. For example, the `aiohttp` library—used for asynchronous API

| `EXCLUDED` | Repos to exclude (comma-separated) | ❌ No | `user/repo1,user/repo2` |

| `EXCLUDED_LANGS` | Languages to exclude (comma-separated) | ❌ No | `HTML,CSS` |Click the **[Use this template](https://github.com/jstrieb/github-stats/generate)** button to create a copy of this repository.requests—may include the requested URL in exceptions, which can leak the name

| `EXCLUDE_FORKED_REPOS` | Ignore forked repositories | ❌ No | `true` |

of private repositories. If there is an exception caused by `aiohttp`, this

### Example: Exclude Repositories

> **Important**: Use "Create a new repository" not "Fork" to get a clean copy without the commit history.exception will be viewable in the Actions tab of the repository fork, and

1. Go to **Settings** → **Secrets and variables** → **Actions**

2. Click **New repository secret**anyone may be able to see the name of one or more private repositories.

3. Name: `EXCLUDED`

4. Value: `jstrieb/test-repo,jstrieb/old-project`### 3. Add Your Token as a Secret



### Example: Exclude LanguagesDue to some issues with the GitHub statistics API, there are some situations



To hide HTML and CSS from your language stats:1. Go to your forked repository's **Settings** → **Secrets and variables** → **Actions**where it returns inaccurate results. Specifically, the repository view count



1. Name: `EXCLUDED_LANGS`2. Click **New repository secret**statistics and total lines of code modified are probably somewhat inaccurate.

2. Value: `HTML,CSS`

3. Name: `ACCESS_TOKEN`Unexpectedly, these values will become more accurate over time as GitHub

### Schedule

4. Value: Paste your personal access tokencaches statistics for your repositories. Additionally, repositories that were

By default, stats are regenerated:

5. Click **Add secret**last contributed to more than a year ago may not be included in the statistics

- **Daily** at 00:05 UTC

- On every **push** to masterdue to limitations in the results returned by the API.

- **Manually** via workflow dispatch

### 4. Enable GitHub Actions

To change the schedule, edit `.github/workflows/main.yml`:

For more information on inaccuracies, see issue

```yaml

schedule:1. Go to the **Actions** tab in your repository[#2](https://github.com/jstrieb/github-stats/issues/2),

  - cron: "5 0 * * *"  # Change this line

```2. Click **"I understand my workflows, go ahead and enable them"**[#3](https://github.com/jstrieb/github-stats/issues/3), and



## 🛠️ Local Development3. Click **"Generate Stats Images"** workflow[#13](https://github.com/jstrieb/github-stats/issues/13).



### Prerequisites4. Click **"Run workflow"** → **"Run workflow"**



- **Node.js** 20 or higher# Installation

- **pnpm** (recommended) or npm

### 5. Add Images to Your Profile

### Installation

<!-- TODO: Add details and screenshots -->

```bash

# Install pnpm globally (if not installed)Once the workflow completes, add these to your profile README:

npm install -g pnpm

1. Create a personal access token (not the default GitHub Actions token) using

# Clone your fork

git clone https://github.com/YOUR_USERNAME/github-stats.git```markdown   the instructions

cd github-stats

![GitHub Stats](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/overview.svg#gh-dark-mode-only)   [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

# Install dependencies

pnpm install![GitHub Stats](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/overview.svg#gh-light-mode-only)   Personal access token must have permissions: `read:user` and `repo`. Copy

```

   the access token when it is generated – if you lose it, you will have to

### Configuration

![Top Languages](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/languages.svg#gh-dark-mode-only)   regenerate the token.

Create a `.env` file:

![Top Languages](https://github.com/YOUR_USERNAME/github-stats/blob/master/generated/languages.svg#gh-light-mode-only)   - Some users are reporting that it can take a few minutes for the personal

```bash

cp .env.example .env```     access token to work. For more, see 

```

     [#30](https://github.com/jstrieb/github-stats/issues/30).

Edit `.env` with your credentials:

**Replace `YOUR_USERNAME` with your GitHub username!**2. Create a copy of this repository by clicking

```env

ACCESS_TOKEN=ghp_your_personal_access_token   [here](https://github.com/jstrieb/github-stats/generate). Note: this is

GITHUB_ACTOR=your_username

```## ⚙️ Configuration   **not** the same as forking a copy because it copies everything fresh,



### Development Commands   without the huge commit history. 



```bash### Environment Variables3. Go to the "Secrets" page of your copy of the repository. If this is the

# Run in development mode (fast, no build)

pnpm dev   README of your copy, click [this link](../../settings/secrets/actions) to go



# Build TypeScript to JavaScriptConfigure the statistics generation by adding repository secrets:   to the "Secrets" page. Otherwise, go to the "Settings" tab of the

pnpm build

   newly-created repository and go to the "Secrets" page (bottom left).

# Run production build

pnpm start| Variable | Description | Required | Example |4. Create a new secret with the name `ACCESS_TOKEN` and paste the copied



# Type checking|----------|-------------|----------|---------|   personal access token as the value.

pnpm type-check

| `ACCESS_TOKEN` | GitHub personal access token | ✅ Yes | `ghp_xxxxxxxxxxxx` |5. It is possible to change the type of statistics reported by adding other

# Lint code

pnpm lint| `GITHUB_ACTOR` | Your GitHub username | ✅ Yes | Automatically set by Actions |   repository secrets. 



# Format code| `EXCLUDED` | Repos to exclude (comma-separated) | ❌ No | `user/repo1,user/repo2` |   - To ignore certain repos, add them (in owner/name format e.g.,

pnpm format

| `EXCLUDED_LANGS` | Languages to exclude (comma-separated) | ❌ No | `HTML,CSS` |     `jstrieb/github-stats`) separated by commas to a new secret—created as

# Clean build artifacts

pnpm clean| `EXCLUDE_FORKED_REPOS` | Ignore forked repositories | ❌ No | `true` |     before—called `EXCLUDED`.

```

   - To ignore certain languages, add them (separated by commas) to a new

## 📁 Project Structure

### Example: Exclude Repositories     secret called `EXCLUDED_LANGS`. For example, to exclude HTML and TeX you

```

github-stats/     could set the value to `html,tex`.

├── src/

│   ├── index.ts              # Main entry point1. Go to **Settings** → **Secrets and variables** → **Actions**   - To show statistics only for "owned" repositories and not forks with

│   ├── stats.ts              # Statistics collection

│   ├── github-client.ts      # GitHub API client2. Click **New repository secret**     contributions, add an environment variable (under the `env` header in the

│   ├── types.ts              # TypeScript type definitions

│   └── templates/3. Name: `EXCLUDED`     [main

│       └── index.ts          # SVG template generators

├── dist/                     # Compiled JavaScript (generated)4. Value: `jstrieb/test-repo,jstrieb/old-project`     workflow](https://github.com/jstrieb/github-stats/blob/master/.github/workflows/main.yml))

├── generated/                # Generated SVG files (output)

│   ├── overview.svg     called `EXCLUDE_FORKED_REPOS` with a value of `true`.

│   └── languages.svg

├── .github/### Example: Exclude Languages   - These other values are added as secrets by default to prevent leaking

│   └── workflows/

│       └── main.yml          # GitHub Actions workflow     information about private repositories. If you're not worried about that,

├── package.json              # Dependencies and scripts

├── pnpm-lock.yaml           # pnpm lockfileTo hide HTML and CSS from your language stats:     you can change the values directly [in the Actions workflow

├── tsconfig.json            # TypeScript configuration

└── .env.example             # Environment template     itself](https://github.com/jstrieb/github-stats/blob/05de1314b870febd44d19ad2f55d5e59d83f5857/.github/workflows/main.yml#L48-L53).

```

1. Name: `EXCLUDED_LANGS`6. Go to the [Actions

## 🎨 Customization

2. Value: `HTML,CSS`   Page](../../actions?query=workflow%3A"Generate+Stats+Images") and press "Run

### Modifying Templates

   Workflow" on the right side of the screen to generate images for the first

The SVG templates are in `src/templates/index.ts`. You can customize:

### Schedule   time. 

- **Colors** - Change the color scheme

- **Layout** - Adjust dimensions and positioning   - The images will be automatically regenerated every 24 hours, but they can

- **Content** - Add or remove statistics

- **Animations** - Modify animation timings and effectsBy default, stats are regenerated:     be regenerated manually by running the workflow this way.



Example: Change the card width:- **Daily** at 00:05 UTC7. Take a look at the images that have been created in the



```typescript- On every **push** to master   [`generated`](generated) folder.

export function generateOverview(data: StatsData): string {

  return `<svg width="400" height="210" ...>  // Change from 360 to 400- **Manually** via workflow dispatch8. To add your statistics to your GitHub Profile README, copy and paste the

```

   following lines of code into your markdown content. Change the `username`

### Adding New Statistics

To change the schedule, edit `.github/workflows/main.yml`:   value to your GitHub username.

1. Add data collection in `src/stats.ts`

2. Update types in `src/types.ts`   ```md

3. Modify template in `src/templates/index.ts`

```yaml   ![](https://raw.githubusercontent.com/username/github-stats/master/generated/overview.svg#gh-dark-mode-only)

## 🤝 Contributing

schedule:   ![](https://raw.githubusercontent.com/username/github-stats/master/generated/overview.svg#gh-light-mode-only)

Contributions are welcome! Here's how:

  - cron: "5 0 * * *"  # Change this line   ```

1. Fork the repository

2. Create a feature branch: `git checkout -b feature/amazing-feature````   ```md

3. Make your changes

4. Run tests: `pnpm type-check && pnpm lint`   ![](https://raw.githubusercontent.com/username/github-stats/master/generated/languages.svg#gh-dark-mode-only)

5. Commit: `git commit -m 'Add amazing feature'`

6. Push: `git push origin feature/amazing-feature`## 🛠️ Local Development   ![](https://raw.githubusercontent.com/username/github-stats/master/generated/languages.svg#gh-light-mode-only)

7. Open a Pull Request

   ```

### Code Style

### Prerequisites9. Link back to this repository so that others can generate their own

- **TypeScript**: Strict mode enabled

- **Formatting**: Prettier (run `pnpm format`)   statistics images.

- **Linting**: ESLint (run `pnpm lint`)

- **Types**: All code must be fully typed- **Node.js** 20 or higher10. Star this repo if you like it!



## 🐛 Troubleshooting- **pnpm** (recommended) or npm



### "Workflow run failed"



**Check the Actions tab for details:**### Installation# Support the Project



1. Go to the **Actions** tab

2. Click on the failed workflow

3. Review the error logs```bashThere are a few things you can do to support the project:



**Common issues:**# Install pnpm globally (if not installed)



- Invalid `ACCESS_TOKEN` - Regenerate your tokennpm install -g pnpm- Star the repository (and follow me on GitHub for more)

- Token doesn't have `repo` permission

- Repository secrets not configured- Share and upvote on sites like Twitter, Reddit, and Hacker News



### "No data showing"# Clone your fork- Report any bugs, glitches, or errors that you find



- Wait a few minutes after first rungit clone https://github.com/YOUR_USERNAME/github-stats.git

- Check that your token has correct permissions

- Verify `GITHUB_ACTOR` is set correctlycd github-statsThese things motivate me to keep sharing what I build, and they provide

- Look for error messages in Actions logs

validation that my work is appreciated! They also help me improve the

### "Private repos not included"

# Install dependenciesproject. Thanks in advance!

- Ensure token has `repo` scope (not just `public_repo`)

- Check token hasn't expiredpnpm install

- Verify token is saved as `ACCESS_TOKEN` secret

```If you are insistent on spending money to show your support, I encourage you to

### "Rate limit exceeded"

instead make a generous donation to one of the following organizations. By advocating

- GitHub API has rate limits (5,000 requests/hour for authenticated users)

- The script handles rate limiting automatically### Configurationfor Internet freedoms, organizations like these help me to feel comfortable

- Consider reducing frequency if you have many repositories

releasing work publicly on the Web.

### Local development issues

Create a `.env` file:

```bash

# Reinstall dependencies- [Electronic Frontier Foundation](https://supporters.eff.org/donate/)

pnpm clean

pnpm install```bash- [Signal Foundation](https://signal.org/donate/)



# Rebuild TypeScriptcp .env.example .env- [Mozilla](https://donate.mozilla.org/en-US/)

pnpm build

```- [The Internet Archive](https://archive.org/donate/index.php)

# Check for type errors

pnpm type-check

```

Edit `.env` with your credentials:

## 📊 Statistics Explained

# Related Projects

### Overview Card

```env

- **Stars** - Total stars across all repositories

- **Forks** - Total forks of your repositoriesACCESS_TOKEN=ghp_your_personal_access_token- Inspired by a desire to improve upon

- **All-time contributions** - Total contributions across all years

- **Lines of code changed** - Sum of additions and deletionsGITHUB_ACTOR=your_username  [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

- **Repository views** - Views in the last 14 days (only accessible for owned repos)

- **Repositories with contributions** - Number of repos you've contributed to```- Makes use of [GitHub Octicons](https://primer.style/octicons/) to precisely



### Languages Card  match the GitHub UI



Shows the top languages by file size across all your repositories:### Development Commands



- Includes all languages from owned and contributed repositories```bash

- Percentages based on total bytes of code# Run in development mode (fast, no build)

- Colors match GitHub's language colorspnpm dev



## ⚠️ Privacy & Security# Build TypeScript to JavaScript

pnpm build

### What This Project Accesses

# Run production build

- Public repository datapnpm start

- Private repository data (if token has `repo` scope)

- User profile information# Type checking

- Contribution statisticspnpm type-check

- Repository traffic (views)

# Lint code

### Security Considerationspnpm lint



- **Token Security**: Your access token is stored as a GitHub secret and never exposed# Format code

- **Private Data**: Error messages may contain repository names - check Actions logs if concernedpnpm format

- **No External Services**: Everything runs in your GitHub Actions, no data sent elsewhere

- **Open Source**: Full code available for audit# Clean build artifacts

pnpm clean

### Best Practices```



1. **Use Fine-Grained Tokens** (when available) with minimal permissions## 📁 Project Structure

2. **Regularly Rotate Tokens** every few months

3. **Review Actions Logs** for any unexpected errors```

4. **Use Repository Secrets** never commit tokens to codegithub-stats/

├── src/

## 🚀 Performance│   ├── index.ts              # Main entry point

│   ├── stats.ts              # Statistics collection

### Why TypeScript + pnpm?│   ├── github-client.ts      # GitHub API client

│   ├── types.ts              # TypeScript type definitions

- **TypeScript**: Type safety catches bugs before runtime│   └── templates/

- **pnpm**: 3x faster installs, 40% less disk space│       └── index.ts          # SVG template generators

- **Modern Stack**: Better developer experience and tooling├── dist/                     # Compiled JavaScript (generated)

├── generated/                # Generated SVG files (output)

### Benchmarks│   ├── overview.svg

│   └── languages.svg

| Metric | npm (Python) | pnpm (TypeScript) | Improvement |├── .github/

|--------|--------------|-------------------|-------------|│   └── workflows/

| Install | ~18s | ~6s | **3x faster** ⚡ |│       └── main.yml          # GitHub Actions workflow

| Startup | ~250ms | ~75ms | **3x faster** 🚀 |├── package.json              # Dependencies and scripts

| Disk Usage | ~185MB | ~108MB | **42% less** 💾 |├── pnpm-lock.yaml           # pnpm lockfile

├── tsconfig.json            # TypeScript configuration

## 📝 License└── .env.example             # Environment template

```

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## 🎨 Customization

## 🌟 Acknowledgments

### Modifying Templates

- **Original Python Implementation** by [Jacob Strieb](https://github.com/jstrieb)

- **GitHub API** via [@octokit](https://github.com/octokit)The SVG templates are in `src/templates/index.ts`. You can customize:

- **GitHub Octicons** for beautiful icons

- **Community Contributors** for improvements and bug fixes- **Colors** - Change the color scheme

- **Layout** - Adjust dimensions and positioning

## 💖 Support- **Content** - Add or remove statistics

- **Animations** - Modify animation timings and effects

If you find this project useful:

Example: Change the card width:

- ⭐ Star this repository

- 🐛 Report bugs via [Issues](https://github.com/jstrieb/github-stats/issues)```typescript

- 🤝 Contribute via [Pull Requests](https://github.com/jstrieb/github-stats/pulls)export function generateOverview(data: StatsData): string {

- 📢 Share with others!  return `<svg width="400" height="210" ...>  // Change from 360 to 400

```

---

### Adding New Statistics

<div align="center">

1. Add data collection in `src/stats.ts`

**[⬆ Back to Top](#github-stats-visualization)**2. Update types in `src/types.ts`

3. Modify template in `src/templates/index.ts`

Made with ❤️ and TypeScript

## 🤝 Contributing

</div>

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm type-check && pnpm lint`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (run `pnpm format`)
- **Linting**: ESLint (run `pnpm lint`)
- **Types**: All code must be fully typed

## 🐛 Troubleshooting

### "Workflow run failed"

**Check the Actions tab for details:**
1. Go to the **Actions** tab
2. Click on the failed workflow
3. Review the error logs

**Common issues:**
- Invalid `ACCESS_TOKEN` - Regenerate your token
- Token doesn't have `repo` permission
- Repository secrets not configured

### "No data showing"

- Wait a few minutes after first run
- Check that your token has correct permissions
- Verify `GITHUB_ACTOR` is set correctly
- Look for error messages in Actions logs

### "Private repos not included"

- Ensure token has `repo` scope (not just `public_repo`)
- Check token hasn't expired
- Verify token is saved as `ACCESS_TOKEN` secret

### "Rate limit exceeded"

- GitHub API has rate limits (5,000 requests/hour for authenticated users)
- The script handles rate limiting automatically
- Consider reducing frequency if you have many repositories

### Local development issues

```bash
# Reinstall dependencies
pnpm clean
pnpm install

# Rebuild TypeScript
pnpm build

# Check for type errors
pnpm type-check
```

## 📊 Statistics Explained

### Overview Card

- **Stars** - Total stars across all repositories
- **Forks** - Total forks of your repositories
- **All-time contributions** - Total contributions across all years
- **Lines of code changed** - Sum of additions and deletions
- **Repository views** - Views in the last 14 days (only accessible for owned repos)
- **Repositories with contributions** - Number of repos you've contributed to

### Languages Card

Shows the top languages by file size across all your repositories:
- Includes all languages from owned and contributed repositories
- Percentages based on total bytes of code
- Colors match GitHub's language colors

## ⚠️ Privacy & Security

### What This Project Accesses

- Public repository data
- Private repository data (if token has `repo` scope)
- User profile information
- Contribution statistics
- Repository traffic (views)

### Security Considerations

- **Token Security**: Your access token is stored as a GitHub secret and never exposed
- **Private Data**: Error messages may contain repository names - check Actions logs if concerned
- **No External Services**: Everything runs in your GitHub Actions, no data sent elsewhere
- **Open Source**: Full code available for audit

### Best Practices

1. **Use Fine-Grained Tokens** (when available) with minimal permissions
2. **Regularly Rotate Tokens** every few months
3. **Review Actions Logs** for any unexpected errors
4. **Use Repository Secrets** never commit tokens to code

## 🚀 Performance

### Why TypeScript + pnpm?

- **TypeScript**: Type safety catches bugs before runtime
- **pnpm**: 3x faster installs, 40% less disk space
- **Modern Stack**: Better developer experience and tooling

### Benchmarks

| Metric | npm (Python) | pnpm (TypeScript) | Improvement |
|--------|--------------|-------------------|-------------|
| Install | ~18s | ~6s | **3x faster** ⚡ |
| Startup | ~250ms | ~75ms | **3x faster** 🚀 |
| Disk Usage | ~185MB | ~108MB | **42% less** 💾 |

## 📝 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Original Python Implementation** by [Jacob Strieb](https://github.com/jstrieb)
- **GitHub API** via [@octokit](https://github.com/octokit)
- **GitHub Octicons** for beautiful icons
- **Community Contributors** for improvements and bug fixes

## � Advanced Configuration

### Excluding Repositories via package.json

In addition to using the `EXCLUDED` environment variable, you can configure repository exclusions directly in your `package.json` file:

```json
{
  "name": "github-stats",
  "version": "2.0.0",
  "github-stats": {
    "omitRepos": [
      "owner/repo-name",
      "another-owner/another-repo"
    ]
  }
}
```

**Example:**

```json
{
  "github-stats": {
    "omitRepos": ["AssetVal/AssetVal", "username/test-repo"]
  }
}
```

**Benefits:**
- ✅ Version controlled with your code
- ✅ No need to configure repository secrets for exclusions
- ✅ Combines with `EXCLUDED` environment variable (both are applied)
- ✅ Easier to manage and review multiple exclusions
- ✅ Automatically read when the stats are generated

The `omitRepos` array should contain repository names in `owner/repo` format. These repositories will be excluded from all statistics calculations including stars, forks, contributions, lines changed, and language statistics.

> **Note**: Repositories specified in both `package.json` (`omitRepos`) and the `EXCLUDED` environment variable will be combined. There's no conflict if a repository appears in both places.

## �💖 Support

If you find this project useful:

- ⭐ Star this repository
- 🐛 Report bugs via [Issues](https://github.com/jstrieb/github-stats/issues)
- 🤝 Contribute via [Pull Requests](https://github.com/jstrieb/github-stats/pulls)
- 📢 Share with others!

---

<div align="center">

**[⬆ Back to Top](#github-stats-visualization)**

Made with ❤️ and TypeScript

</div>
