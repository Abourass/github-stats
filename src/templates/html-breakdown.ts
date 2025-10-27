import type { StatsData, RepoBreakdown } from '../types.js';

export function generateHTMLBreakdown(data: StatsData): string {
  if (!data.repoBreakdowns || data.repoBreakdowns.length === 0) {
    return '<html><body><h1>No detailed breakdown available</h1></body></html>';
  }

  const totalAdditions = data.linesChanged[0];
  const totalDeletions = data.linesChanged[1];
  const totalLinesChanged = totalAdditions + totalDeletions;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - GitHub Stats Breakdown</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      padding: 2rem;
      min-height: 100vh;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .summary-card:hover {
      transform: translateY(-5px);
    }

    .summary-card h3 {
      font-size: 0.9rem;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }

    .summary-card .value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #667eea;
    }

    .section-title {
      background: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .section-title h2 {
      font-size: 1.8rem;
      color: #333;
    }

    .repo-grid {
      display: grid;
      gap: 1.5rem;
    }

    .repo-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .repo-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .repo-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .repo-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: #0366d6;
      text-decoration: none;
      word-break: break-all;
    }

    .repo-name:hover {
      text-decoration: underline;
    }

    .repo-badges {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .badge-stars {
      background: #fff3cd;
      color: #856404;
    }

    .badge-forks {
      background: #d1ecf1;
      color: #0c5460;
    }

    .badge-commits {
      background: #d4edda;
      color: #155724;
    }

    .badge-views {
      background: #f8d7da;
      color: #721c24;
    }

    .repo-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .additions {
      color: #28a745;
    }

    .deletions {
      color: #dc3545;
    }

    .languages {
      margin-top: 1rem;
    }

    .languages-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: #666;
    }

    .language-bars {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .language-bar {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .language-name {
      min-width: 100px;
      font-size: 0.9rem;
      color: #666;
    }

    .language-progress {
      flex: 1;
      height: 8px;
      background: #e1e4e8;
      border-radius: 4px;
      overflow: hidden;
    }

    .language-fill {
      height: 100%;
      background: #667eea;
      transition: width 0.3s;
    }

    .language-percent {
      min-width: 50px;
      text-align: right;
      font-size: 0.85rem;
      color: #666;
    }

    footer {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    footer p {
      color: #666;
    }

    footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }

      h1 {
        font-size: 2rem;
      }

      .repo-header {
        flex-direction: column;
      }

      .summary-card .value {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 ${data.name}</h1>
      <p class="subtitle">Detailed GitHub Statistics Breakdown</p>
    </header>

    <div class="summary-grid">
      <div class="summary-card">
        <h3>Total Stars</h3>
        <div class="value">⭐ ${data.stargazers.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Total Forks</h3>
        <div class="value">🍴 ${data.forks.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Contributions</h3>
        <div class="value">📈 ${data.totalContributions.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Repositories</h3>
        <div class="value">📦 ${data.repos.length}</div>
      </div>
      <div class="summary-card">
        <h3>Lines Added</h3>
        <div class="value additions">+${totalAdditions.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Lines Deleted</h3>
        <div class="value deletions">-${totalDeletions.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Lines Changed</h3>
        <div class="value">${totalLinesChanged.toLocaleString()}</div>
      </div>
      <div class="summary-card">
        <h3>Views (14d)</h3>
        <div class="value">👀 ${data.views.toLocaleString()}</div>
      </div>
    </div>

    <div class="section-title">
      <h2>🗂️ Repository Breakdown (${data.repoBreakdowns.length} repos)</h2>
    </div>

    <div class="repo-grid">
      ${data.repoBreakdowns.map((repo) => generateRepoCard(repo)).join('\n')}
    </div>

    <footer>
      <p>Generated by <a href="https://github.com/jstrieb/github-stats" target="_blank">GitHub Stats</a></p>
      <p>Last updated: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </footer>
  </div>
</body>
</html>`;
}

function generateRepoCard(repo: RepoBreakdown): string {
  const languageEntries = Object.entries(repo.languages)
    .sort(([, a], [, b]) => b.size - a.size)
    .slice(0, 5); // Top 5 languages

  const languageBars = languageEntries.length > 0
    ? `
      <div class="languages">
        <div class="languages-title">Languages</div>
        <div class="language-bars">
          ${languageEntries.map(([lang, stats]) => `
            <div class="language-bar">
              <div class="language-name">${lang}</div>
              <div class="language-progress">
                <div class="language-fill" style="width: ${stats.prop}%"></div>
              </div>
              <div class="language-percent">${stats.prop?.toFixed(1)}%</div>
            </div>
          `).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <div class="repo-card">
      <div class="repo-header">
        <a href="https://github.com/${repo.name}" class="repo-name" target="_blank">
          ${repo.name}
        </a>
        <div class="repo-badges">
          ${repo.stars > 0 ? `<span class="badge badge-stars">⭐ ${repo.stars}</span>` : ''}
          ${repo.forks > 0 ? `<span class="badge badge-forks">🍴 ${repo.forks}</span>` : ''}
          ${repo.contributions > 0 ? `<span class="badge badge-commits">📝 ${repo.contributions} commits</span>` : ''}
          ${repo.views > 0 ? `<span class="badge badge-views">👀 ${repo.views} views</span>` : ''}
        </div>
      </div>

      <div class="repo-stats">
        <div class="stat-item">
          <div class="stat-label">Lines Added</div>
          <div class="stat-value additions">+${repo.additions.toLocaleString()}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Lines Deleted</div>
          <div class="stat-value deletions">-${repo.deletions.toLocaleString()}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Total Changed</div>
          <div class="stat-value">${(repo.additions + repo.deletions).toLocaleString()}</div>
        </div>
      </div>

      ${languageBars}
    </div>
  `;
}
