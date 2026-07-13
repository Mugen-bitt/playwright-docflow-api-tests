import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './ui-tests',
  globalSetup: './global-setup.ts',
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.example.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
