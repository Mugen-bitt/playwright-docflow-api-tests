import { APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';

export async function parseJsonSafe(response: APIResponse): Promise<any> {
  const status = response.status();
  const headers = response.headers();
  const rawBody = await response.text();

  await allure.attachment('Response status', String(status), 'text/plain');
  await allure.attachment('Response headers', JSON.stringify(headers, null, 2), 'application/json');
  await allure.attachment('Raw response body', rawBody, 'text/plain');

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new Error(
      `Expected JSON but received non-JSON response (status ${status}). ` +
      `This usually indicates an infrastructure issue (e.g. 502/HTML error page) rather than a test failure. ` +
      `Raw body: ${rawBody.slice(0, 300)}`
    );
  }
}
