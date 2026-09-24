# Aurick

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Notes on the property
### Images
* https://photos.google.com/share/AF1QipPRaCJCZ83E_nblSbG16hpEP63yx1v5Vk_AwlzKGQZUuebLn3TA0WQnJsO8V0QnpQ?key=bENHQWo3dnY5MWhndGo4bWpnbl9xd2lLMDIxeU9B

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build -- --configuration production` to build the production site. The build artifacts will be stored in `dist/aurick/`.

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys the site on every push to `master`. It can also be started from **Actions → Deploy Harrison Garden → Run workflow** with `master` selected.

In GitHub repository **Settings → Secrets and variables → Actions**, set the repository secret `FTP_PASSWORD` to the password for `deploy@harrisongarden.com`.

The workflow runs `npm ci`, builds the production site, and uploads only `dist/aurick/` to `ftp.harrisongarden.com` over FTP on port 21. The destination defaults to `./`, relative to the FTP account's login directory. If that is not the website's document root, set the repository variable `FTP_SERVER_DIR` to the correct directory, including a trailing `/` (for example, `/public_html/`).

Deployments run one at a time. The FTP action tracks uploaded files in `.ftp-deploy-sync-state.json` on the server so subsequent deployments can update changed files and remove previously deployed files that are no longer in the build. Keep that state file on the server.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
