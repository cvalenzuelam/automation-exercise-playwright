import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
    public readonly enterAccountInformationHeader: Locator;
    public readonly mrRadio: Locator;
    public readonly mrsRadio: Locator;
    public readonly nameInput: Locator;

    public readonly passwordInput: Locator;
    public readonly daysDropdown: Locator;
    public readonly monthsDropdown: Locator;
    public readonly yearsDropdown: Locator;
    public readonly newsletterCheckbox: Locator;
    public readonly specialOffersCheckbox: Locator;

    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly companyInput: Locator;
    public readonly addressInput: Locator;
    public readonly address2Input: Locator;
    public readonly countryDropdown: Locator;
    public readonly stateInput: Locator;
    public readonly cityInput: Locator;
    public readonly zipCodeInput: Locator;
    public readonly mobileNumberInput: Locator;
    public readonly createAccountButton: Locator;


    constructor(page: Page) {
        super(page);
        this.enterAccountInformationHeader = page.locator('b:has-text("ENTER ACCOUNT INFORMATION")')
        this.mrRadio = page.getByRole('radio', { name: 'Mr.' })
        this.mrsRadio = page.getByRole('radio', { name: 'Mrs.' })
        this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true })
        this.passwordInput = page.getByLabel('Password *', { exact: true })
        this.daysDropdown = page.locator('#days')
        this.monthsDropdown = page.locator('#months')
        this.yearsDropdown = page.locator('#years')
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
        this.specialOffersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from our partners!' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' })
        this.companyInput = page.getByLabel('Company', { exact: true })
        this.addressInput = page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)')
        this.address2Input = page.getByLabel('Address 2', { exact: true })
        this.countryDropdown = page.getByRole('combobox', { name: 'Country *' })
        this.stateInput = page.getByRole('textbox', { name: 'State *' })
        this.cityInput = page.getByRole('textbox', { name: 'City *' })
        this.zipCodeInput = page.locator('#zipcode')
        this.mobileNumberInput = page.getByLabel('Mobile Number *', { exact: true })
        this.createAccountButton = page.getByText('Create Account', { exact: true })

    }

    async fillSignUpForm(name: string, email: string) {
        await this.nameInput.fill(name)
        await this.passwordInput.fill('password')
        await this.daysDropdown.selectOption('24')
        await this.monthsDropdown.selectOption('May')
        await this.yearsDropdown.selectOption('1992')
        await this.newsletterCheckbox.check()
        await this.specialOffersCheckbox.check()
    }

    async fillAddressInformation() {
        await this.firstNameInput.fill('Christopher')
        await this.lastNameInput.fill('Valenzuela')
        await this.companyInput.fill('Google')
        await this.addressInput.fill('123 Main St')
        await this.address2Input.fill('123 Main St')
        await this.countryDropdown.selectOption('United States')
        await this.stateInput.fill('California')
        await this.cityInput.fill('Los Angeles')
        await this.zipCodeInput.fill('12345')
        await this.mobileNumberInput.fill('1234567890')
        await this.createAccountButton.click()
    }

    async completeRegistration(name: string, email: string) {
        await this.fillSignUpForm(name, email);
        await this.fillAddressInformation();

    }

    async verifyIsLoaded() {
        await expect(this.enterAccountInformationHeader).toBeVisible();
        await expect(this.page).toHaveURL('/signup');
    }

}