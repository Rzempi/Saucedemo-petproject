import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { users } from "../../test-data";

test('Locked out login', {tag: [ '@functional', '@regression', '@negative', '@login', '@ui' ] }, async ({ openedPage, loginPage }) => {

    await test.step('Logging in', async () => {
        await expect(loginPage.usernameField).toBeVisible();
        await loginPage.fillUsernameField(users.locked.username);
        await expect(loginPage.usernameField).toHaveValue(users.locked.username);

        await expect(loginPage.passwordField).toBeVisible();
        await loginPage.fillPasswordField(users.locked.password);
        await expect(loginPage.passwordField).toHaveValue(users.locked.password);

        await expect(loginPage.loginButton).toBeVisible();
        await loginPage.clickLoginButton();
    });

    await expect(loginPage.error.locator).toHaveText(loginPage.error.lockedUserErrorText);
});
