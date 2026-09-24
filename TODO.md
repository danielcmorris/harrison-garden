# Harrison Garden cleanup

Code-review cleanup completed September 24, 2026. Checked items are implemented and validated; see CLEANUP_REPORT.md for results and verification limits.

## Priority 1: Navigation and page weight

- [x] Initialize slideshow and gallery behavior once per component lifecycle.
  - `src/app/app.component.ts` reloads `src/assets/js/main.js` on navigation, even though `angular.json` also bundles it.
  - Move initialization into the owning components; remove handlers and destroy plugin instances when components are destroyed.
  - Check repeated Home/About/Gallery navigation, slideshow autoplay, gallery popups, sticky navigation, and back-to-top behavior.
  - Preserve Angular fragment scrolling; review the unconditional `window.scrollTo(0, 0)` call.

- [x] Optimize gallery images.
  - The bedroom, shower, and sink images displayed in `gallery.component.html` total roughly 10 MB.
  - Generate appropriately sized thumbnails and WebP variants while retaining suitable full-size popup images.
  - Add lazy loading to below-the-fold images and explicit dimensions where practical.
  - Verify visual quality, layout stability, and reduced transferred image bytes.

## Priority 2: Remove template leftovers

- [x] Remove demo routes `/home-2`, `/home-3`, and `/home-4`.
  - Remove their components and module declarations, then audit shared components before deleting anything else.
  - Remove template property listings, placeholder contacts, and nonfunctional demo forms with those pages.
  - Remove assets referenced only by the demos, including `src/assets/video/Home.mp4` (roughly 5 MB).
  - Decide how retired URLs should redirect and verify the actual Harrison homepage remains intact.

- [x] Remove the unused Google Maps JavaScript API script from `src/index.html`.
  - The current map uses an iframe; no Maps JavaScript API usage was found during review.
  - Preserve the map iframe and Google Analytics tag `G-0B83PWH64H`.

## Priority 3: Tests and maintenance

- [x] Repair the test setup.
  - Replace starter assertions in `src/app/app.component.spec.ts` that expect an `aurick` title and starter-page markup.
  - Provide the actual component dependencies and account for UI plugin initialization in tests.
  - Resolve Node type compatibility with TypeScript 5.2: the recent lockfile repair selected `@types/node` 26, and `tsc --project tsconfig.spec.json --noEmit` fails in those definitions.
  - Verify a clean `npm ci`, test compilation, meaningful tests, and the production build using the workflow runtime.

- [x] Remove or replace obsolete end-to-end test configuration.
  - `angular.json` references `e2e/protractor.conf.js`, which is absent.
  - Update the corresponding Protractor instructions in `README.md`.

- [x] Improve accessibility in the retained components.
  - Replace generic image alt text with useful descriptions; mark decorative images appropriately.
  - Add an accessible title to the map iframe.
  - Make the back-to-top control a keyboard-accessible button with an accessible name.
  - Verify keyboard navigation and gallery behavior.

- [x] Remove small template leftovers after functional cleanup.
  - Delete commented-out sections, unused imports/properties, empty constructors, and empty lifecycle methods.
  - Correct visible copy typos and review the hard-coded copyright year.
  - Update README template branding and outdated version information.

## Completion checks

- [x] Run a clean dependency install and production build.
- [x] Verify desktop and mobile navigation, slideshow, gallery, map, and Analytics tag preservation.
- [x] Confirm FTP deployment still uploads `dist/aurick/` to `ftp.harrisongarden.com` using `FTP_PASSWORD` and the configured destination directory.

## Work log

- Lifecycle cleanup: component-owned Swiper and gallery setup/teardown; Angular scroll handlers and mobile menu state; removed duplicate script loading and unconditional scroll reset. Production build checked; browser interaction checks follow in completion validation.
- Found additional test setup defects: Karma references an uninstalled Istanbul reporter and test discovery needs verification. Included in the test repair task.
- Gallery optimization: eight 800px WebP thumbnails total 553,026 bytes versus 12,309,801 bytes previously (95.5% reduction); separate up-to-1920px WebP popup images, lazy loading, decoding hints, and intrinsic dimensions. Browser visual checks included in final validation.
- Demo cleanup: retired URLs (and unknown routes) redirect to the real homepage; removed 13 unused components, demo-only style sections, 29 unreferenced stock images, and Home.mp4. Actual property photos remain available.
- Removed the unused Maps JavaScript API script; verified the gallery map iframe and both Analytics ID references remain.
- Test repair: pinned @types/node 20.11.30, fixed Karma coverage reporter, enabled fixture teardown, loaded real UI plugins in the test target, and replaced starter specs with seven passing Chrome tests. Clean npm ci and TypeScript test compilation pass on Node 20.20.2; CI now checks types and runs tests before deployment.
- Replaced the missing Protractor target with Playwright against the production build. All 12 desktop/mobile Chromium checks pass, including repeated fragments without duplicate Swiper instances, autoplay, keyboard gallery/focus restoration, loaded images, retired redirects, and integration preservation.
- Browser review found the map too short on narrow screens; set a 320px minimum height as part of retained-component accessibility cleanup. Added a slideshow pause/play control and respect for reduced-motion preferences.
- Accessibility validation: seven unit tests and 16 desktop/mobile browser checks pass, including keyboard back-to-top, gallery focus restoration, slideshow pause/play, and reduced motion. Reviewed desktop/mobile gallery screenshots.
- Template cleanup: removed commented demo markup, empty About lifecycle, stale metadata/scrollspy, obsolete polyfill notes, unused animation styles and Bootstrap/Popper JavaScript; fixed copy, dynamic copyright, and README branding/runtime/test guidance. Initial JS/CSS now 827.49 kB (estimated transfer 185.20 kB). Seven unit tests and 16 browser checks pass.

## Additional issues found

- [x] Fix direct visits to retired demo URLs on the production host: Angular redirects work after the app loads, but the host currently returns HTTP 404 before Angular loads. Ship static redirect landing pages without changing unknown server configuration.
- Direct URL fix: shipped static redirect pages for all three retired demo paths. Production-build browser tests now use a static server without SPA fallback and check both trailing-slash and non-trailing-slash URLs. Live verification follows deployment.

## Final validation

- Final clean npm ci, test compilation, seven Chrome unit tests, and production build pass on Node 20.20.2. Sixteen desktop/mobile Playwright checks pass.
- Live desktop (1440px) and mobile (390px) checks confirm gallery interaction, keyboard focus, back-to-top, map visibility, Analytics tag, no horizontal overflow, and zero application errors. Each viewport transferred exactly 553,026 thumbnail bytes.
- FTP workflow retains dist/aurick/, ftp.harrisongarden.com, FTP_PASSWORD, and FTP_SERVER_DIR with ./ fallback. Successful deployments verified through GitHub Actions.
- Nonblocking toolchain notes: two existing vendor selectors are skipped during critical CSS inlining; full stylesheets remain emitted. npm reports transitive dependency deprecation notices. Details and browser coverage limits are in CLEANUP_REPORT.md.
- Final implementation deployment d52b96e succeeded (GitHub Actions run 35968036595). Live browser checks confirm all six retired-URL variants reach the Harrison homepage. All checklist items are complete.
