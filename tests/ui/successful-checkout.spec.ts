import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';

test('successful-checkout', { tag: [ '@functional', '@smoke', '@positive', '@e2e', '@ui' ] }, async ({ toCompletedCheckout, navbar, checkoutCompletePage  }) => {

    await expect(navbar.pageTitle).toHaveText('Checkout: Complete!')
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});