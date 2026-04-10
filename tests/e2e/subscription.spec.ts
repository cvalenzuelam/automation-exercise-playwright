import { test } from '../../fixtures/test-fixtures';

test.describe('Automation Exercise - Subscription @subscription', () => {



    test('Subscribe to newsletter @smoke', async ({ footer }) => {
        await test.step('Scroll down to footer', async () => {
            await footer.scrollTo();
        });

        await test.step('Verify text "SUBSCRIPTION" is visible', async () => {
            await footer.verifySubscriptionHeaderVisible();
        });

        await test.step('Enter email address in input and click arrow button', async () => {
            await footer.subscribe('test@test.com');
        });

        await test.step('Verify success message newsletter', async () => {
            await footer.verifySuccessMessageVisible();
        });
    });
    //test

    test('Verify Subscription in Cart page', async ({ footer, header }) => {
        await test.step('Click Cart button', async () => {
            await header.clickCart();
        });

        await test.step('Verify subscription text is visible', async () => {
            await footer.verifySubscriptionHeaderVisible();
        });

        await test.step('Enter email address in input and click arrow button', async () => {
            await footer.subscribe('test@test.com');
        });

        await test.step('Verify success message newsletter', async () => {
            await footer.verifySuccessMessageVisible();
        });
    });

});

