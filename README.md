# Harrison Garden

Property website for the garden apartment at 2723 Harrison Street in San Francisco. Built with Angular 17 and TypeScript 5.2; the deployment workflow uses Node.js 20.

## Development

Use Node.js 20, run `npm ci`, then `npm start`. Open `http://localhost:4200/`; source changes reload automatically.

The homepage contains the slideshow, About section, photo gallery, and embedded Google map. Navigation uses Angular fragments. Swiper and Magnific Popup initialize and clean up with their owning components. The mobile menu and scroll controls use Angular bindings.

## Build

Run `npm run build -- --configuration production`. Output remains in `dist/aurick/` for compatibility with the configured deployment. The internal Angular project name is also retained as `aurick`.

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys the site on every push to `master`. It can also be started from **Actions → Deploy Harrison Garden → Run workflow** with `master` selected.

In GitHub repository **Settings → Secrets and variables → Actions**, set the repository secret `FTP_PASSWORD` to the password for `deploy@harrisongarden.com`.

The workflow runs `npm ci`, builds the production site, and uploads only `dist/aurick/` to `ftp.harrisongarden.com` over FTP on port 21. The destination defaults to `./`, relative to the FTP account's login directory. If that is not the website's document root, set the repository variable `FTP_SERVER_DIR` to the correct directory, including a trailing `/` (for example, `/public_html/`).

Deployments run one at a time. The FTP action tracks uploaded files in `.ftp-deploy-sync-state.json` on the server so subsequent deployments can update changed files and remove previously deployed files that are no longer in the build. Keep that state file on the server.

## Tests

- `npm run typecheck:test` checks test compilation.
- `npm test` starts interactive Karma tests.
- `npm run test:ci` runs the unit suite once in headless Chrome. Set `CHROME_BIN` if Chrome is not on the default path.
- Install browser dependencies once with `npx playwright install --with-deps chromium`, then run `npm run test:e2e` to build and test desktop and mobile Chromium. Tests cover navigation, autoplay/pause, keyboard gallery controls and focus, image loading, redirects, and retained integrations. Screenshots and failure traces are written to `test-results/`.

Deployment runs test compilation and unit tests before building and uploading. Run the browser suite locally for interaction changes.

## Images

Gallery thumbnails are WebP images sized to at most 800px wide; popup versions are at most 1920px wide. Thumbnails declare dimensions and load lazily. Original property photographs are retained in `src/assets/img/apt/` for future edits.

## Maintenance

See [TODO.md](TODO.md) for the cleanup checklist and work log.

Retired `/home-2`, `/home-3`, and `/home-4` URLs have static redirect pages copied from `src/redirects/`, so direct visits work on the FTP host without a server rewrite rule. The browser test server deliberately has no SPA fallback.
