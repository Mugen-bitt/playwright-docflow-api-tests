import { test, expect } from '../fixtures/apiClient';
import { allure } from 'allure-playwright';

const TEMPLATE_NAME = 'demoTemplateForRegress';

test('POST | Create template', async ({ apiClient }) => {
  await allure.step('Send create template request', async () => {
    const response = await apiClient.post('/templates/v1/templates', {
      data: { name: TEMPLATE_NAME },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(TEMPLATE_NAME);
  });
});
