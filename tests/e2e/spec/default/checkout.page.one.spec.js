import { languageSelectors, openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';
import CheckoutPageOne from '../../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../../screenObjects/checkoutPageTwo';
import { PERSONAL_INFO } from '../../helpers/e2eConstants';

describe('Checkout: Your info', () => {
	const SELECTORS = languageSelectors();

	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
		openDeepLinkUrl('personal-info/0,1,2');
		CheckoutPageOne.waitForIsShown();
	});

	it('should be able to submit my personal info and proceed the checkout', () => {
		CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
		CheckoutPageTwo.waitForIsShown();

		expect(CheckoutPageOne.isShown()).toEqual(false, 'The Checkout: Your info screen is still visible.');
	});

	it('should be able to cancel shopping and go to the items overview page', () => {
		CheckoutPageOne.cancelCheckout();
		InventoryListScreen.waitForIsShown();

		expect(CheckoutPageOne.isShown()).toEqual(false, 'The Checkout: Your info screen is still visible.');
	});

	it('should show an error when the first name has not been entered', () => {
		CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_FIRSTNAME);

		expect(CheckoutPageOne.getErrorMessage()).toContain(SELECTORS.checkoutPageOne.errors.firstName, 'The error message is not as expected');
	});

	it('should show an error when the last name has not been entered', () => {
		CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_LAST_NAME);

		expect(CheckoutPageOne.getErrorMessage()).toContain(SELECTORS.checkoutPageOne.errors.lastName, 'The error message is not as expected');
	});

	it('should show an error when the postal code has not been entered', () => {
		CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_POSTAL_CODE);

		expect(CheckoutPageOne.getErrorMessage()).toContain(SELECTORS.checkoutPageOne.errors.postalCode, 'The error message is not as expected');
	});
});
