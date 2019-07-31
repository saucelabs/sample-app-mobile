import SELECTORS from '../../../src/js/config/translations/en';
import { getTextOfElement, sanitizeSelector } from '../helpers/utils';
import Base from './base';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

const SCREEN_SELECTOR = `~test-${ sanitizeSelector(SELECTORS.login.screen) }`;

class LoginScreen extends Base {
	constructor() {
		super(SCREEN_SELECTOR);
	}

	get screen() {
		return $(SCREEN_SELECTOR);
	}

	get username() {
		return $(`~test-${ sanitizeSelector(SELECTORS.login.username) }`);
	}

	get password() {
		return $(`~test-${ sanitizeSelector(SELECTORS.login.password) }`);
	}

	get loginButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.login.loginButton) }`);
	}

	get errorMessage() {
		return $(`~test-${ sanitizeSelector(SELECTORS.login.errors.container) }`);
	}

	/**
	 * Sign in
	 *
	 * @param {object} userDetails
	 * @param {string} userDetails.username
	 * @param {string} userDetails.password
	 */
	signIn(userDetails) {
		const { password, username } = userDetails;

		if (username !== '') {
			this.username.addValue(username);
		}
		if (password !== '') {
			this.password.addValue(password);
		}

		this.loginButton.click();
	}

	/**
	 * Get the text or the error message container
	 *
	 * @return {string}
	 */
	getErrorMessage() {
		this.errorMessage.waitForDisplayed(DEFAULT_TIMEOUT);

		return getTextOfElement(this.errorMessage);
	}

	/**
	 * Check if the error message is displayed
	 *
	 * @return {boolean}
	 */
	isErrorMessageIsShown() {
		return this.isShown(this.errorMessage);
	}
}

export default new LoginScreen();
