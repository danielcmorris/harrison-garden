# Harrison Garden cleanup report

Completed September 24, 2026. All eight original cleanup tasks and the additional production redirect issue have been implemented. Each task was committed and pushed separately to `master`.

## Results

- Slideshow and gallery initialization now follows component lifecycles. Removed repeated script downloads, duplicate event registration, and the scroll reset that conflicted with fragment navigation. Mobile menu state and scroll controls use Angular.
- Eight gallery thumbnails now total **553,026 bytes**, down from **12,309,801 bytes** (**95.5% smaller**). Separate WebP popup images are sized up to 1920px wide. Thumbnails have intrinsic dimensions and lazy loading; original property photos remain available.
- Removed three demo pages, 13 unused components, 29 stock images, the demo video, obsolete forms, and associated style sections. Retired URLs redirect to the real homepage.
- Removed the unused Maps JavaScript API loader while retaining the map iframe and Analytics tag `G-0B83PWH64H`.
- Repaired Karma, pinned compatible Node typings, replaced starter assertions, and added type checks and unit tests before FTP deployment.
- Replaced broken Protractor configuration with Playwright tests for desktop and mobile Chromium.
- Added descriptive image text, a map title, keyboard focus indicators, an accessible back-to-top button, slideshow pause/play, and reduced-motion support. The mobile map now has a useful minimum height.
- Cleaned commented markup, empty lifecycle code, unused libraries, and stale metadata. Fixed copy, made copyright year dynamic, and rewrote the README around Harrison Garden.
- Initial CSS/JavaScript totals **827.49 kB**, with estimated compressed transfer **185.20 kB**.

## Additional issue discovered and resolved

The live host returned HTTP 404 for direct requests to `/home-2`, `/home-3`, and `/home-4`, before Angular could handle them. Added static redirect landing pages to the FTP build, without overwriting unknown server configuration. The test server now deliberately omits SPA fallback and verifies all three paths with and without trailing slashes.

## Validation

- Node **20.20.2**, matching the deployment workflow's Node 20 major version.
- Clean `npm ci`.
- `npm run typecheck:test`.
- **7 passing Karma tests** in headless Chrome.
- **16 passing Playwright tests** across desktop and mobile Chromium against the production build.
- Production build passes, with desktop/mobile screenshots reviewed.
- Live desktop (1440px) and mobile (390px) smoke checks pass with zero application errors, no horizontal overflow, functioning gallery/keyboard controls, a visible map, and the Analytics tag. Actual gallery thumbnail transfer measured **553,026 bytes** at each viewport.
- Browser checks cover repeated Home/About/Gallery navigation, a single surviving slideshow instance, autoplay, pause/play, reduced motion, sticky navigation, keyboard gallery opening/advancing/closing and restored focus, image loading and dimensions, horizontal overflow, back-to-top, map title/height, retired URLs, and integration preservation.

## Deployment

The workflow still uploads only `dist/aurick/` to `ftp.harrisongarden.com` as `deploy@harrisongarden.com`, using `FTP_PASSWORD`. Destination selection remains `FTP_SERVER_DIR` with `./` as the default. Uploads remain serialized. The internal Angular project/output name `aurick` is intentionally retained for deployment compatibility.

The final implementation deployment, [GitHub Actions run 35968036595](https://github.com/danielcmorris/harrison-garden/actions/runs/35968036595), completed successfully for commit `d52b96e`. Live browser checks confirmed all three retired paths redirect to the homepage, with and without trailing slashes.

## Commits

| Commit | Task |
| --- | --- |
| `e75d813` | Component lifecycle and navigation |
| `d6e0c47` | Gallery image optimization |
| `3916d2c` | Demo pages, components, and assets |
| `e760a07` | Unused Maps API loader |
| `ec3ff15` | Unit tests, typings, and CI checks |
| `e0dfd09` | Playwright replacement for Protractor |
| `22a5536` | Accessibility and slideshow controls |
| `ee76e2a` | Template, copy, dependency, and README cleanup |
| `d52b96e` | Direct retired-URL redirects |

## Remaining limitations

No functional cleanup items remain. The build still reports two existing vendor-selector warnings during critical CSS inlining (Bootstrap and Swiper); their styles remain in the emitted stylesheet, and browser tests pass. Dependency installation reports transitive package deprecation notices. Browser automation covers Chromium desktop/mobile emulation, not physical devices or Safari/Firefox. Analytics tag presence is verified; access to the Analytics reporting account was not needed or tested.
