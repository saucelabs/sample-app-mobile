import Base from './base';
import { getTextOfElement, hideKeyboard, languageSelectors } from '../helpers/utils';
import Gestures from '../helpers/Gestures';

class CheckoutPageOne extends Base {
	constructor() {
		super(`~test-${ languageSelectors().checkoutPageOne.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.screen }`);
	}

	get cancelButton() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.cancelButton }`);
	}

	get continueCheckoutButton() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.continueButton }`);
	}

	get firstName() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.firstName }`);
	}

	get lastName() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.lastName }`);
	}

	get postalCode() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.postalCode }`);
	}

	get errorMessage() {
		return $(`~test-${ this.SELECTORS.checkoutPageOne.errors.container }`);
	}

	/**
	 * Submit personal info
	 *
	 * @param {object} personalInfo
	 * @param {string} personalInfo.firstName
	 * @param {string} personalInfo.lastName
	 * @param {string} personalInfo.postalCode
	 */
	submitPersonalInfo(personalInfo) {
		const { firstName, lastName, zip } = personalInfo;

		this.waitForIsShown();

		if (firstName !== '') {
			this.firstName.addValue(firstName);
		}
		if (lastName !== '') {
			this.lastName.addValue(lastName);
		}
		if (zip !== '') {
			this.postalCode.addValue(zip);
		}

		// On smaller devices the keyboard is in front of the submit button, so hide it
		hideKeyboard(this.firstName);
		// Check if the button is visible, if not scroll to it
		Gestures.scrollToElement({
			element: this.continueCheckoutButton,
			maxScrolls: 2,
			swipeDirection: 'up',
		});
		// Click on the button
		this.continueCheckoutButton.click();
	}

	/**
	 * Get the text or the error message container
	 *
	 * @return {string}
	 */
	getErrorMessage() {
		this.waitForIsShown(this.errorMessage);

		return getTextOfElement(this.errorMessage);
	}

	/**
	 * Check if the error message is shown
	 *
	 * @return {boolean}
	 */
	isErrorMessageShown() {
		return this.isShown(this.errorMessage);
	}

	/**
	 * Cancel checkout
	 *
	 * @return {void}
	 */
	cancelCheckout() {
		// On smaller devices the keyboard is in front of the submit button, so hide it
		hideKeyboard(this.firstName);
		Gestures.scrollToElement({
			element: this.cancelButton,
			maxScrolls: 2,
			swipeDirection: 'up',
		});
		return this.cancelButton.click();
	}
}

export default new CheckoutPageOne();
