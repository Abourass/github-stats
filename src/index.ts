import * as fs from 'fs/promises';
import * as path from 'path';
import { Stats } from './stats.js';
import { generateOverview, generateLanguages } from './templates/index.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface PackageJsonConfig {
  'github-stats'?: {
    omitRepos?: string[];
  };
}

async function loadPackageJsonConfig(): Promise<Set<string>> {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson: PackageJsonConfig = JSON.parse(content);
    
    const omitRepos = packageJson['github-stats']?.omitRepos || [];
    return new Set(omitRepos);
  } catch (error) {
    // If package.json doesn't exist or can't be read, return empty set
    return new Set();
  }
}

async function ensureGeneratedFolder(): Promise<void> {
  const generatedPath = path.join(process.cwd(), 'generated');
  try {
    await fs.access(generatedPath);
  } catch {
    await fs.mkdir(generatedPath, { recursive: true });
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting GitHub stats generation...\n');

  // Get environment variables
  const accessToken = process.env.ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('ACCESS_TOKEN environment variable is required!');
  }

  const username = process.env.GITHUB_ACTOR;
  if (!username) {
    throw new Error('GITHUB_ACTOR environment variable must be set!');
  }

  // Load omitRepos from package.json
  const packageJsonOmitRepos = await loadPackageJsonConfig();

  // Parse excluded repos from environment variable
  const excludedReposStr = process.env.EXCLUDED || '';
  const envExcludedRepos = excludedReposStr
    ? new Set(excludedReposStr.split(',').map((s: string) => s.trim()))
    : new Set<string>();

  // Combine both sources of excluded repos
  const excludedRepos = new Set([...packageJsonOmitRepos, ...envExcludedRepos]);

  // Parse excluded languages
  const excludedLangsStr = process.env.EXCLUDED_LANGS || '';
  const excludedLangs = excludedLangsStr
    ? new Set(excludedLangsStr.split(',').map((s: string) => s.trim()))
    : new Set<string>();

  // Parse ignore forked repos flag
  const ignoreForkedReposStr = process.env.EXCLUDE_FORKED_REPOS || '';
  const ignoreForkedRepos = ignoreForkedReposStr.toLowerCase() === 'true';

  console.log(`📊 Collecting stats for: ${username}`);
  if (excludedRepos.size > 0) {
    console.log(`   Excluding ${excludedRepos.size} repositories:`);
    excludedRepos.forEach((repo) => console.log(`     - ${repo}`));
  }
  if (excludedLangs.size > 0) {
    console.log(`   Excluding languages: ${Array.from(excludedLangs).join(', ')}`);
  }
  if (ignoreForkedRepos) {
    console.log(`   Ignoring forked repositories`);
  }
  console.log();

  // Create stats instance
  const stats = new Stats(username, accessToken, {
    excludeRepos: excludedRepos,
    excludeLangs: excludedLangs,
    ignoreForkedRepos,
  });

  // Collect statistics
  console.log('⏳ Fetching data from GitHub API...');
  const data = await stats.collect();
  console.log('✅ Data collection complete!\n');

  // Display summary
  console.log('📈 Statistics Summary:');
  console.log(`   Name: ${data.name}`);
  console.log(`   Stars: ${data.stargazers.toLocaleString()}`);
  console.log(`   Forks: ${data.forks.toLocaleString()}`);
  console.log(`   Contributions: ${data.totalContributions.toLocaleString()}`);
  console.log(
    `   Lines Changed: ${(data.linesChanged[0] + data.linesChanged[1]).toLocaleString()}`
  );
  console.log(`   Views (14 days): ${data.views.toLocaleString()}`);
  console.log(`   Repositories: ${data.repos.length}`);
  console.log(
    `   Languages: ${Object.keys(data.languages).length} (top: ${Object.keys(data.languages).slice(0, 3).join(', ')})`
  );
  console.log();

  // Ensure generated folder exists
  await ensureGeneratedFolder();

  // Generate and save SVG files
  console.log('🎨 Generating SVG images...');

  const overviewSvg = generateOverview(data);
  const languagesSvg = generateLanguages(data);

  await fs.writeFile(path.join('generated', 'overview.svg'), overviewSvg, 'utf-8');
  await fs.writeFile(path.join('generated', 'languages.svg'), languagesSvg, 'utf-8');

  console.log('✅ SVG files generated successfully!');
  console.log('   📄 generated/overview.svg');
  console.log('   📄 generated/languages.svg');
  console.log();
  console.log('🎉 Done!');
}

// Run the main function
main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
