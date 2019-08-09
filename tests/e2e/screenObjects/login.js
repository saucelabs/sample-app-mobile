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

	get biometryButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.login.biometry) }`);
	}

	get iosAllowBiometry() {
		return $('~Don’t Allow');
	}

	get allowBiometry() {
		return $('~OK');
	}

	get iosRetryBiometry() {
		return $('~Try Again');
	}

	get androidBiometryAlert() {
		return $('*//*[@resource-id="com.swaglabsmobileapp:id/fingerprint_status"]');
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
	 * Submit biometric login
	 *
	 * @param {boolean|number} successful
	 */
	submitBiometricLogin(successful) {
		// Touch / Face ID needs to be triggered differently on iOS
		if (driver.isIOS) {
			// Determine Face / Touch ID
			return this.submitIosBiometricLogin(successful);
		}

		return this.submitAndroidBiometricLogin(successful ? 1 : 2);
	}

	/**
	 * Verify that the biometric login failed
	 *
	 * return {boolean}
	 */
	isBiometryAlertShown() {
		if (driver.isIOS) {
			return this.iosRetryBiometry.waitForDisplayed(15000);
		}

		// We need to pause here to make sure the biometric log in has been executed
		driver.pause(1000);

		return this.androidBiometryAlert.waitForDisplayed(1500);
	}

	/**
	 * Submit iOS biometric login
	 *
	 * @param {boolean} successful
	 *
	 * @return {Promise<void>}
	 */
	submitIosBiometricLogin(successful) {
		// Check if biometric usage is  allowed
		this.allowIosBiometricUsage();

		return driver.execute('mobile:sendBiometricMatch', { type: this.isFaceId() ? 'faceId' : 'touchId', match: successful });
	}

	/**
	 * Allow biometric usage on iOS if it isn't already accepted
	 */
	allowIosBiometricUsage() {
		if (!driver.isBioMetricAllowed) {
			// Wait for the alert
			this.iosAllowBiometry.waitForDisplayed(15000);
			this.allowBiometry.click();
			// Set it to accept
			driver.isBioMetricAllowed = true;
		}
	}

	/**
	 * Check if this is the biometric login supports FaceID
	 *
	 * @return {boolean}
	 */
	isFaceId() {
		return $(`~test-${ SELECTORS.login.faceRecognition }`).isDisplayed();
	}

	/**
	 * Submit Android biometric login
	 *
	 * @param {number} fingerprintId
	 *
	 * @return {Promise<void>}
	 */
	submitAndroidBiometricLogin(fingerprintId) {
		return driver.fingerPrint(fingerprintId);
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
