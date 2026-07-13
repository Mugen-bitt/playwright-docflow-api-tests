import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.API_BASE_URL || 'https://api.example.com',
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  },
});
