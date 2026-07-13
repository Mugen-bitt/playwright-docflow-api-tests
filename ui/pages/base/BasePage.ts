import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../../utils/constants';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { timeout: TIMEOUTS.navigation });
  }

  async waitForLoadComplete(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.long });
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }
}
