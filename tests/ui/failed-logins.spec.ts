import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { users } from "../../test-data";

test.describe('Failed logins', {tag: [ '@functional', '@regression', '@negative', '@login', '@ui' ] }, async () => {

    test('Incorrect username', async ({ openedPage, loginPage }) => {

        await test.step('Logging in', async () => {
            await expect(loginPage.usernameField).toBeVisible();
            await loginPage.fillUsernameField("INCORRECT");
            await expect(loginPage.usernameField).toHaveValue("INCORRECT");

            await expect(loginPage.passwordField).toBeVisible();
            await loginPage.fillPasswordField(users.standard.password);
            await expect(loginPage.passwordField).toHaveValue(users.standard.password);

            await expect(loginPage.loginButton).toBeVisible();
            await loginPage.clickLoginButton();
        });

        await expect(loginPage.error.locator).toHaveText(loginPage.error.failedLoginErrorText);
    });

    test('Incorrect password', async ({ openedPage, loginPage }) => {

        await test.step('Logging in', async () => {
            await expect(loginPage.usernameField).toBeVisible();
            await loginPage.fillUsernameField(users.standard.username);
            await expect(loginPage.usernameField).toHaveValue(users.standard.username);

            await expect(loginPage.passwordField).toBeVisible();
            await loginPage.fillPasswordField("INCORRECT");
            await expect(loginPage.passwordField).toHaveValue("INCORRECT");

            await expect(loginPage.loginButton).toBeVisible();
            await loginPage.clickLoginButton();
        });

        await expect(loginPage.error.locator).toHaveText(loginPage.error.failedLoginErrorText);
    });
});