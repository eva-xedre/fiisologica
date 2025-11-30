# fiisologica — GitHub Pages deployment

This repository contains a small static website (root contains `index.html`, `script.js`, `styles.css`). A GitHub Actions workflow is included to publish the repository root to GitHub Pages.

## How it is published

- Workflow: `.github/workflows/deploy.yml`
- Triggers: push to `main` and manual dispatch (workflow_dispatch)
- Actions used: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`
- Published directory: repository root by default

After a successful workflow run the Pages site and its URL are available in the repository's Pages settings panel.

## Change the publish directory

If you prefer to publish a subdirectory (for example `dist/`), update the `path` on the `upload-pages-artifact` step in `.github/workflows/deploy.yml`:

```yaml
      - name: Upload artifact (site)
        uses: actions/upload-pages-artifact@v1
        with:
          path: dist/
```

If you publish a build output directory, add a build step (for example `npm run build`) before uploading the artifact and make sure the build writes into the configured directory.

## Triggering and testing

- Push changes to `main` to trigger the workflow automatically.
- Or run the workflow manually from the Actions tab: open the "Deploy to GitHub Pages" workflow and click "Run workflow".
- Check the run logs in the Actions tab for any errors.
- Once the workflow completes, check the Pages section in the repo settings to find the site URL.

## Notes

- A `.nojekyll` file is included to prevent Jekyll processing so files or folders that start with an underscore are served as-is.
- If the workflow fails, common causes are branch protection rules, insufficient Pages permissions, or the repository requiring a Pages setup step in Settings. Check the Actions logs and repository Settings → Pages for guidance.

## Troubleshooting

- Permission errors: ensure Actions is allowed to manage Pages in repository settings and the workflow has `pages: write` and `id-token: write` permissions (the workflow in this repo already sets these).
- If you have a custom domain, add a `CNAME` file in the publish directory or configure the domain in the Pages settings.

If you'd like, I can also add a short note in this README showing how to publish from a branch like `gh-pages` instead of using the Pages actions.
