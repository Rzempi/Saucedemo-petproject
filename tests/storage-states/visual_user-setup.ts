import { test as setup } from '../../src/fixtures/uiFixtures';
import path from 'path';
import {users} from "../../test-data";

const authFile = path.join(__dirname, '../../playwright/.auth/visual_user.json');

setup('visual_user', async ({ page, loginPage }) => {

    // 1. Go to app
    await page.goto('/');

    // 2. Login
    await loginPage.fillUsernameField(users.visual.username);
    await loginPage.fillPasswordField(users.visual.password);
    await loginPage.clickLoginButton();

    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    await page.context().storageState({ path: authFile });
});