import { test as base } from './uiFixtures';
import {products, users} from '../../test-data';

type FlowFixtures = {
    openedPage: void,
    loggedIn: void,
    toCheckout: void,
    toCompletedCheckout: void,
};

export const test = base.extend<FlowFixtures>({
    openedPage: async ({ page }, use) => {
        // 1. Go to app
        await page.goto('/');

        await use();
    },
    loggedIn: async ({ page, loginPage }, use) => {
        // 1. Go to app
        await page.goto('/');

        // 2. Login
        await loginPage.fillUsernameField(users.standard.username);
        await loginPage.fillPasswordField(users.standard.password);
        await loginPage.clickLoginButton();

        await use();
    },
    toCheckout: async (
        {
            page,
            navbar,
            loginPage,
            yourCartPage
        },
        use
    ) => {
        // 1. Go to app
        await page.goto('/');

        // 2. Login
        await loginPage.fillUsernameField(users.standard.username);
        await loginPage.fillPasswordField(users.standard.password);
        await loginPage.clickLoginButton();

        // 3. Continue to Your Cart
        await navbar.clickShoppingCartLink();

        // 4. Continue to checkout
        await yourCartPage.clickCheckoutButton();

        await use();
    },
    toCompletedCheckout: async (
        {
            page,
            navbar,
            loginPage,
            yourCartPage,
            checkoutPage,
            checkoutOverviewPage,
        },
        use
    ) => {
        // 1. Go to app
        await page.goto('/');

        // 2. Login
        await loginPage.fillUsernameField(users.standard.username);
        await loginPage.fillPasswordField(users.standard.password);
        await loginPage.clickLoginButton();

        // 3. Continue to your cart
        await navbar.clickShoppingCartLink();

        // 4. Continue to checkout
        await yourCartPage.clickCheckoutButton();

        // 5. Fill checkout form
        await checkoutPage.fillFirstNameField("testFirstName");
        await checkoutPage.fillLastNameField("testLastName");
        await checkoutPage.fillZipPostalCodeField("50-506");

        // 6. Continue to order overview
        await checkoutPage.clickContinueButton();

        // 7. Finish the order
        await checkoutOverviewPage.clickFinishButton();

        await use();
    }
});