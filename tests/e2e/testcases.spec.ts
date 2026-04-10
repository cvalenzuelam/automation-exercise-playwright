import { test } from '../../fixtures/test-fixtures';


test.describe('Automation Exercise - Test Cases @testcases', () => {



    test('Verify Test Cases Page @smoke', async ({ page, homePage, testCasesPage }) => {
        await test.step('Navigate to Test Cases page', async () => {
            await homePage.header.clickTestCases();
            await testCasesPage.verifyIsLoaded();
        });
    });
});
