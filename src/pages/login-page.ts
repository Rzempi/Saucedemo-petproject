import {Page} from "@playwright/test";

export class LoginPage {
    constructor(public page: Page) {}
    public usernameField = this.page.getByPlaceholder('Username');
    public passwordField = this.page.getByPlaceholder('Password');
    public loginButton = this.page.locator('[data-test="login-button"]');

    public error = {
        locator: this.page.locator('[data-test="error"]'),
        failedLoginErrorText: "Epic sadface: Username and password do not match any user in this service",
        lockedUserErrorText: "Epic sadface: Sorry, this user has been locked out."
    }

    async fillUsernameField(username: string) {
        await this.usernameField.fill(username);
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}