# VIBES-UI

This is the GUI for the VIBES project. Make sure that you have VIBES running before initiating the GUI.
Change the IP addresses in src/app/app-config.ts to point the GUI to the backend.

## Author
Lubomir Balogh

## Screenshots
+ OEM uploading new Vnet design
https://github.com/CISCO-METZ-GROUP/VIBES-ui/blob/master/screenshots/OEM%20Uploaded%20New%20Design.png
+ Tier1 receiving new Vnet design
https://github.com/CISCO-METZ-GROUP/VIBES-ui/blob/master/screenshots/T1%20Received%20New%20Design.png
+ Tier1 performing offline validation
https://github.com/CISCO-METZ-GROUP/VIBES-ui/blob/master/screenshots/T1%20Performed%20Validation%20and%20Uploaded%20Verdict%20.png
+ OEM receiving T1's verdict
https://github.com/CISCO-METZ-GROUP/VIBES-ui/blob/master/screenshots/OEM%20Received%20Verdict%20from%20T1.png

## Prerequisities

- Both the CLI and generated project have dependencies that require Node.js. Install npm and run `npm install` before running the server.
- Google Chrome - running with [disabled web security](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome).
    ##### -Command in OSX:
    open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## License

Apache 2.0
