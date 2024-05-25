import { defineConfig } from "cypress";

// eslint-disable-next-line no-restricted-exports, import/no-unused-modules
export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  e2e: {
    baseUrl: "https://fdx.qa.coach",
    excludeSpecPattern: [],
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/reports",
    specPattern: "cypress/e2e/**/*.{ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
  },
  env: {
    BASE_URL: "https://fdx.qa.coach",
  },
  pageLoadTimeout: 5000,
  reporterOptions: {
    toConsole: true,
  },
  retries: {
    openMode: 0,
    runMode: 2,
  },
  video: false,
  viewportHeight: 1024,
  viewportWidth: 1280,
});
