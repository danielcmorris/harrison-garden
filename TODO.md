# Harrison Garden cleanup

Follow-up tasks from the code review. These are planned changes, not completed fixes.

## Priority 1: Navigation and page weight

- [x] Initialize slideshow and gallery behavior once per component lifecycle.
  - `src/app/app.component.ts` reloads `src/assets/js/main.js` on navigation, even though `angular.json` also bundles it.
  - Move initialization into the owning components; remove handlers and destroy plugin instances when components are destroyed.
  - Check repeated Home/About/Gallery navigation, slideshow autoplay, gallery popups, sticky navigation, and back-to-top behavior.
  - Preserve Angular fragment scrolling; review the unconditional `window.scrollTo(0, 0)` call.

- [ ] Optimize gallery images.
  - The bedroom, shower, and sink images displayed in `gallery.component.html` total roughly 10 MB.
  - Generate appropriately sized thumbnails and WebP variants while retaining suitable full-size popup images.
  - Add lazy loading to below-the-fold images and explicit dimensions where practical.
  - Verify visual quality, layout stability, and reduced transferred image bytes.

## Priority 2: Remove template leftovers

- [ ] Remove demo routes `/home-2`, `/home-3`, and `/home-4`.
  - Remove their components and module declarations, then audit shared components before deleting anything else.
  - Remove template property listings, placeholder contacts, and nonfunctional demo forms with those pages.
  - Remove assets referenced only by the demos, including `src/assets/video/Home.mp4` (roughly 5 MB).
  - Decide how retired URLs should redirect and verify the actual Harrison homepage remains intact.

- [ ] Remove the unused Google Maps JavaScript API script from `src/index.html`.
  - The current map uses an iframe; no Maps JavaScript API usage was found during review.
  - Preserve the map iframe and Google Analytics tag `G-0B83PWH64H`.

## Priority 3: Tests and maintenance

- [ ] Repair the test setup.
  - Replace starter assertions in `src/app/app.component.spec.ts` that expect an `aurick` title and starter-page markup.
  - Provide the actual component dependencies and account for UI plugin initialization in tests.
  - Resolve Node type compatibility with TypeScript 5.2: the recent lockfile repair selected `@types/node` 26, and `tsc --project tsconfig.spec.json --noEmit` fails in those definitions.
  - Verify a clean `npm ci`, test compilation, meaningful tests, and the production build using the workflow runtime.

- [ ] Remove or replace obsolete end-to-end test configuration.
  - `angular.json` references `e2e/protractor.conf.js`, which is absent.
  - Update the corresponding Protractor instructions in `README.md`.

- [ ] Improve accessibility in the retained components.
  - Replace generic image alt text with useful descriptions; mark decorative images appropriately.
  - Add an accessible title to the map iframe.
  - Make the back-to-top control a keyboard-accessible button with an accessible name.
  - Verify keyboard navigation and gallery behavior.

- [ ] Remove small template leftovers after functional cleanup.
  - Delete commented-out sections, unused imports/properties, empty constructors, and empty lifecycle methods.
  - Correct visible copy typos and review the hard-coded copyright year.
  - Update README template branding and outdated version information.

## Completion checks

- [ ] Run a clean dependency install and production build.
- [ ] Verify desktop and mobile navigation, slideshow, gallery, map, and Analytics tag preservation.
- [ ] Confirm FTP deployment still uploads `dist/aurick/` to `ftp.harrisongarden.com` using `FTP_PASSWORD` and the configured destination directory.

## Work log

- Lifecycle cleanup: component-owned Swiper and gallery setup/teardown; Angular scroll handlers and mobile menu state; removed duplicate script loading and unconditional scroll reset. Production build checked; browser interaction checks follow in completion validation.
- Found additional test setup defects: Karma references an uninstalled Istanbul reporter and test discovery needs verification. Included in the test repair task.
