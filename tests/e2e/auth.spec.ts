import { test } from '../../fixtures/test-fixtures';
import { getRandomEmail, getRandomPassword } from '../../utils/data-generator';
import { LOGIN_MESSAGES, VALID_USER } from '../../data';

test.describe('Automation Exercise - User Authentication & Registration @auth', () => {



  test('Register User @smoke @registration', async ({ homePage, loginPage, signUpPage, accountCreatedPage, deleteAccountPage, header }) => {
    const userName = 'Christopher Valenzuela';
    const email = getRandomEmail();

    await test.step('Navigate to Signup/Login page', async () => {
      await header.clickSignupLogin();
      await loginPage.verifyIsLoaded();
    });

    await test.step(`Attempt to register user: ${userName}`, async () => {
      await loginPage.fillSignupForm(userName, email);
      await loginPage.clickSignup();
    });

    await test.step('Complete registration form and submit', async () => {
      await signUpPage.verifyIsLoaded();
      await signUpPage.completeRegistration(userName, email);
    });

    await test.step('Verify account was created and continue to Home', async () => {
      await accountCreatedPage.verifyIsLoaded();
      await accountCreatedPage.clickContinue();
      await homePage.verifyUserIsLoggedIn();
    });

    await test.step('Delete account and verify final logout state', async () => {
      await header.clickDeleteAccount();
      await deleteAccountPage.verifyIsLoaded();
      await deleteAccountPage.clickContinue();
      await homePage.verifyIsLoaded();
      await homePage.verifyUserIsLoggedOut();
    });
  });

  test('Login User with correct email and password @smoke', async ({ homePage, loginPage, header }) => {
    await test.step('Login with valid credentials', async () => {
      await header.clickSignupLogin();
      await loginPage.verifyIsLoaded();
      await loginPage.fillLoginForm(VALID_USER.EMAIL, VALID_USER.PASSWORD);
      await loginPage.clickLogin();
    });

    await test.step('Verify user successfully logged in', async () => {
      await homePage.verifyUserIsLoggedIn();
    });
  });

  test('Login User with incorrect email and password @regression', async ({ homePage, loginPage, header }) => {
    const incorrectEmail = getRandomEmail();
    const incorrectPassword = getRandomPassword();

    await test.step('Attempt login with non-existent credentials', async () => {
      await header.clickSignupLogin();
      await loginPage.verifyIsLoaded();
      await loginPage.fillLoginForm(incorrectEmail, incorrectPassword);
      await loginPage.clickLogin();
    });

    await test.step('Verify appropriate error message is displayed', async () => {
      await loginPage.verifyErrorMessage(LOGIN_MESSAGES.ERROR_INCORRECT_CREDENTIALS);
    });
  });


  test('Logout User @smoke', async ({ homePage, loginPage, header }) => {
    await test.step('Login with valid credentials', async () => {
      await header.clickSignupLogin();
      await loginPage.verifyIsLoaded();
      await loginPage.fillLoginForm(VALID_USER.EMAIL, VALID_USER.PASSWORD);
      await loginPage.clickLogin();
    });

    await test.step('Verify user successfully logged in', async () => {
      await homePage.verifyUserIsLoggedIn();
    });

    await test.step('Logout user', async () => {
      await header.clickLogout();
    });

    await test.step('Verify user is logged out', async () => {
      await homePage.verifyUserIsLoggedOut();
    });
  });

  test('Register User with existing email @regression', async ({ homePage, loginPage, header }) => {
    await test.step('Navigate to Signup/Login page', async () => {
      await header.clickSignupLogin();
      await loginPage.verifyIsLoaded();
    });

    await test.step('Attempt to register user with existing email', async () => {
      await loginPage.fillSignupForm(VALID_USER.NAME, VALID_USER.EMAIL);
      await loginPage.clickSignup();
    });

    await test.step('Verify appropriate error message is displayed', async () => {
      await loginPage.verifyErrorMessageSignup(LOGIN_MESSAGES.ERROR_EMAIL_ALREADY_REGISTERED);
    });
  });
});