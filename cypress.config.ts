import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
      "baseUrl": "http://localhost:4200",
      "supportFile": false,
      "fixturesFolder": '.',
    },
    video: true,
    videosFolder: 'cypress/e2e/results/videos',
});
