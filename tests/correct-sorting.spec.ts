import { test } from '../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { products, sortOptions } from "../test-data";
import { formatPrice } from "../src/utils";

test.describe('Sorting verification', { tag: [ '@functional', '@regression', '@positive', '@products', '@ui' ] }, async () => {

    test('Sorting A to Z', async ({ loggedIn, navbar, productsPage }) => {

        let sortedProducts = Object.values(products).sort();

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.nameAToZ.value);
        });

        for (let i=0; i<Object.keys(products).length; i++) {
            await expect(productsPage.itemNames.nth(i)).toHaveText(sortedProducts[i]);
        }
    });

    test('Sorting Z to A', async ({ loggedIn, navbar, productsPage }) => {

        let sortedProducts = Object.values(products).sort().reverse();

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.nameZToA.value);
        });

        for (let i=0; i<Object.keys(products).length; i++) {
            await expect(productsPage.itemNames.nth(i)).toHaveText(sortedProducts[i]);
        }
    });

    test('Sorting by Price DESC', async ({ loggedIn, navbar, productsPage  }) => {

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.priceHighToLow.value);
        });

        for (let i=0; i<Object.keys(products).length-1; i++) {
            const currentPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());
            const nextPrice = formatPrice(await productsPage.itemPrices.nth(i+1).innerText());
            expect(currentPrice).toBeGreaterThanOrEqual(nextPrice);
        }
    });

    test('Sorting by Price ASC', async ({ loggedIn, navbar, productsPage  }) => {

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.priceLowToHigh.value);
        });

        for (let i=0; i<Object.keys(products).length-1; i++) {
            const currentPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());
            const nextPrice = formatPrice(await productsPage.itemPrices.nth(i+1).innerText());
            expect(currentPrice).toBeLessThanOrEqual(nextPrice);
        }
    });
})