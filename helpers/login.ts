import { Page } from '@playwright/test';
import { LOGIN_LOCATORS } from './locators';

export async function loginAsUser(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.goto('/login');
  await page.locator(LOGIN_LOCATORS.usernameInput).fill(username);
  await page.locator(LOGIN_LOCATORS.passwordInput).fill(password);
  await page.locator(LOGIN_LOCATORS.submitButton).click();
  await page.waitForURL('**/dashboard**');
}
