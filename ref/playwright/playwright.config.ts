import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

// https://playwright.dev/docs/test-configuration.
const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI, // fail if test.only makes it to CI
  retries: process.env.CI ? 2 : 0, // retries only on CI
  workers: process.env.CI ? 1 : undefined, // opt out of parallel tests on CI
  reporter: 'dot',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI, // allow local dev server when running locally
  },
}

export default config
