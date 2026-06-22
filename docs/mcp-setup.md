# MCP Setup for Fast Shipping

MCP is useful for development speed. It is not part of the deployed app. Keep tokens out of the repository.

For Codex, project-scoped MCP config lives in `.codex/config.toml` when the project is trusted. The CLI and IDE extension share that config.

## Recommended MCPs

1. GitHub MCP: create repo, issues, releases, inspect CI.
2. Context7 MCP: fetch current docs for Stacks, Clarinet, Vercel, or frontend tools.
3. Playwright MCP: verify the deployed page visually.
4. Vercel GitHub integration or Vercel CLI: deploy and inspect production URLs.

## GitHub MCP

GitHub provides an official MCP server. The quickest supported route is the remote server:

```toml
[mcp_servers.github]
url = "https://api.githubcopilot.com/mcp/"
```

For hosts that require a local server, use Docker with a Personal Access Token:

```json
{
  "servers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

Use the smallest token scope that works for the repo. Never commit the token.

## Context7 and Playwright

These are already listed in `.codex/config.toml`:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp"]
```

They may download packages the first time they run.

## Vercel

I did not add a Vercel MCP server to the checked-in config because the public campaign does not require Vercel automation, and a wrong or unofficial deployment MCP would slow us down. The free and reliable fallback is the Vercel GitHub integration:

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Other.
4. Build command: leave empty.
5. Output directory: leave empty or use `.`.

For this project, Vercel does not need to install dependencies because the site is static.

## Stacks

Fastest free contract workflow:

1. Open `/deploy.html` on the deployed website.
2. Connect Xverse on testnet.
3. Deploy `proof-pad`.
4. Repeat on mainnet only when ready for the Talent campaign.

The campaign page says to add a Stacks smart contract to the verified project, but the public page does not specify whether testnet is enough. Confirm this in Talent before spending mainnet STX.

## Two-Minute Build Script

Manual fastest sequence:

```powershell
git init
git add .
git commit -m "Ship Stacks Proof Pad"
gh repo create stacks-proof-pad --public --source . --push
```

Then import the repo in Vercel or another free static host.
