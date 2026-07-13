import { test as base, APIRequestContext, request } from '@playwright/test';

type ApiFixtures = { apiClient: APIRequestContext };

export const test = base.extend<ApiFixtures>({
  apiClient: async ({}, use) => {
    const client = await request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: { 'x-api-key': process.env.API_KEY || '' },
    });
    await use(client);
    await client.dispose();
  },
});

export const expect = test.expect;
