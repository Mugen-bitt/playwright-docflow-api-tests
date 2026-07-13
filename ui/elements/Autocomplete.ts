import { Page, Locator } from '@playwright/test';

export class Autocomplete {
  private readonly page: Page;
  private readonly container: Locator;

  constructor(page: Page, containerSelector: string) {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async type(value: string): Promise<void> {
    const input = this.container.locator('input');
    await input.fill(value);
    await this.page.waitForTimeout(300); // debounce for suggestions to appear
  }

  async selectOption(optionText: string): Promise<void> {
    const option = this.container.locator('li', { hasText: optionText });
    await option.click();
  }

  async getSuggestions(): Promise<string[]> {
    const options = this.container.locator('li');
    return options.allTextContents();
  }
}
