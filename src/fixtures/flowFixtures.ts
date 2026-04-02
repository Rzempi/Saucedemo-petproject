import { test as base } from './uiFixtures';

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
    loggedIn: async ({ page }, use) => {
        // 1. Go to products page
        await page.goto('/inventory.html');

        await use();
    },
    toCheckout: async (
        {
            page,
            navbar,
            yourCartPage
        },
        use
    ) => {
        // 1. Go to products page
        await page.goto('/inventory.html');

        // 2. Continue to Your Cart
        await navbar.clickShoppingCartLink();

        // 3. Continue to checkout
        await yourCartPage.clickCheckoutButton();

        await use();
    }
});