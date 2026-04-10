import { test } from '../../fixtures/test-fixtures';
import { getRandomEmail, getRandomName, getRandomMessage, getRandomSubject } from '../../utils/data-generator';


test.describe('Automation Exercise - Contact Us @contact', () => {



    test('Contact Us Form @smoke', async ({ homePage, contactUsPage }) => {
        const name = getRandomName();
        const email = getRandomEmail();
        const message = getRandomMessage();
        const subject = getRandomSubject();

        await test.step('Navigate to Contact Us page', async () => {
            await homePage.header.clickContactUs();
            await contactUsPage.verifyIsLoaded();
        });

        await test.step('Fill in the contact form', async () => {
            await contactUsPage.fillContactForm(name, email, subject, message);
            await contactUsPage.uploadFileToForm();
        });

        await test.step('Submit the contact form', async () => {
            await contactUsPage.clickSubmit();

        });




    });
});