import { test as setup } from '../../src/fixtures/uiFixtures';
import path from 'path';
import {users} from "../../test-data";

const authFile = path.join(__dirname, '../../playwright/.auth/error_user.json');

setup('error_user', async ({ page, loginPage }) => {

    // 1. Go to app
    await page.goto('/');

    // 2. Login
    await loginPage.fillUsernameField(users.error.username);
    await loginPage.fillPasswordField(users.error.password);
    await loginPage.clickLoginButton();

    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    await page.context().storageState({ path: authFile });
});