import { chromium, FullConfig } from '@playwright/test';
import { loginAsUser } from './helpers/login';

const USERS = [
  { role: 'buyer', username: process.env.USER_BUYER_LOGIN!, password: process.env.USER_BUYER_PASSWORD!, storagePath: 'playwright/.auth/buyer.json' },
  { role: 'seller', username: process.env.USER_SELLER_LOGIN!, password: process.env.USER_SELLER_PASSWORD!, storagePath: 'playwright/.auth/seller.json' },
];

export default async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await chromium.launch();

  for (const user of USERS) {
    const page = await browser.newPage();
    await loginAsUser(page, user.username, user.password);
    await page.context().storageState({ path: user.storagePath });
    await page.close();
  }

  await browser.close();
}
