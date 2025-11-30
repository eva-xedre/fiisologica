# fiisologica — GitHub Pages deployment

This repository contains a small static website (root contains `index.html`, `script.js`, `styles.css`). A GitHub Actions workflow is included to publish the repository root to GitHub Pages.

## How it is published

 - Workflow: `.github/workflows/deploy.yml`
 - Triggers: push to `main` and manual dispatch (workflow_dispatch)
 - Deployment method: publishes a prepared `site/` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages@v4`.
 - Published directory: `site/` by default (the workflow copies `index.html`, `script.js`, `styles.css`, and `.nojekyll` into `site/` before publishing)

After a successful workflow run the Pages site and its URL are available in the repository's Pages settings panel.

## Change the publish directory

If you prefer to publish a different directory (for example `dist/`), update the `publish_dir` value in `.github/workflows/deploy.yml` and adjust the `Prepare site` step to copy or build into that directory.

If you publish a build output directory, add a build step (for example `npm run build`) before the `Prepare site`/copy step and make sure the build writes into the configured directory.

## Triggering and testing

- Push changes to `main` to trigger the workflow automatically.
- Or run the workflow manually from the Actions tab: open the "Deploy to GitHub Pages" workflow and click "Run workflow".
- Check the run logs in the Actions tab for any errors.
- Once the workflow completes, check the Pages section in the repo settings to find the site URL.

## Notes

- A `.nojekyll` file is included to prevent Jekyll processing so files or folders that start with an underscore are served as-is.
- If the workflow fails, common causes are branch protection rules, insufficient Pages permissions, or the repository requiring a Pages setup step in Settings. Check the Actions logs and repository Settings → Pages for guidance.

## Troubleshooting

- Permission errors (403 when pushing to `gh-pages`):
	- Make sure GitHub Actions is allowed to make changes in this repository (Organization or repo settings may restrict Actions write permissions).
	- The workflow includes the recommended permissions (`contents: write`, `pages: write`, `id-token: write`), but some orgs or repos restrict what the `GITHUB_TOKEN` can do. If you still see a `Write access to repository not granted` or `fatal: unable to access` error, create a personal access token (PAT) with `repo` scope and add it to the repository secrets (for example name it `GH_PAGES_PAT`). Then update the workflow to use that token by replacing `github_token: ${{ secrets.GITHUB_TOKEN }}` in `.github/workflows/deploy.yml` with `personal_token: ${{ secrets.GH_PAGES_PAT }}`.
	- Branch protection rules that require reviews or block force-pushes may also prevent the workflow from updating `gh-pages`. Either allow GitHub Actions to push to protected branches (in branch protection settings) or relax rules for the `gh-pages` branch.

- Custom domain: if you use a custom domain, add a `CNAME` file to the publish directory (it will be copied into `site/`), or configure the domain in the Pages settings.

If you'd like, I can update the workflow to automatically use a `GH_PAGES_PAT` secret if present, add a small check to fail early with a clear error message, or switch to publishing via the official Pages actions once the deprecated artifact action issue is resolved.
