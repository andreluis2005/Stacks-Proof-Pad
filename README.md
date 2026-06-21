# Stacks Proof Pad

A tiny Stacks Builder Rewards project designed to be built and submitted fast.

The public site gives reviewers a concrete project page. The Clarity contract gives Talent a Stacks smart contract to attach to the verified project.

## Fastest Path

1. Push this folder to a new GitHub repo.
2. Deploy the repo on Vercel, Cloudflare Pages, or Netlify as a static site.
3. Add the deployed website to Talent App and verify it.
4. Deploy `contracts/proof-pad.clar` with Clarinet or Hiro Platform.
5. Add the deployed Stacks contract to the verified Talent project.

## Why This Approach

Do not copy a random GitHub project. A fresh static site plus a tiny original contract is faster to understand, safer for licensing, and easier to verify. Use examples only as reference.

## Files

- `index.html`: public site and demo.
- `styles.css`: responsive UI.
- `app.js`: local proof preview.
- `contracts/proof-pad.clar`: minimal Clarity contract.
- `Clarinet.toml`: contract project metadata.
- `docs/mcp-setup.md`: MCP setup plan for GitHub, Vercel, and Stacks workflow.

## Local Preview

Open `index.html` directly in a browser. No install step is required.
