import { test as base } from '@playwright/test';
import {
    LoginPage,
    ProductsPage,
    YourCartPage,
    CheckoutPage,
    CheckoutOverviewPage,
    CheckoutCompletePage
} from '../pages';
import { Navbar } from '../components';

type UIFixtures = {
    navbar: Navbar;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    yourCartPage: YourCartPage;
    checkoutPage: CheckoutPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<UIFixtures>({
    navbar: async ({ page }, use) => {
        await use(new Navbar(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    yourCartPage: async ({ page }, use) => {
        await use(new YourCartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },

    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
});