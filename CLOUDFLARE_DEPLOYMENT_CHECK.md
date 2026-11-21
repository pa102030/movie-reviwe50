# Cloudflare Git deployment check

This documentation-only change is intended to test whether the repository's configured production branch is connected to the existing Cloudflare Worker deployment.

After this pull request is merged into `main`, check the Cloudflare dashboard for a new build.

- Expected Worker: `movies-world-tmdb`
- Production branch: `main`
- Keep `TMDB_READ_TOKEN` in Cloudflare secrets. Never commit it to this repository.
- This file does not change website runtime code or Worker configuration.

If no build starts after the merge, review the Cloudflare Workers Builds repository connection and production-branch settings.
