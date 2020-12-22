import { getTextOfElement, languageSelectors } from '../helpers/utils';
import Base from './base';
import { DEFAULT_PIN, DEFAULT_TIMEOUT, INCORRECT_PIN } from '../helpers/e2eConstants';

class LoginScreen extends Base {
	constructor() {
		super(`~test-${ languageSelectors().login.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.login.screen }`);
	}

	get username() {
		return $(`~test-${ this.SELECTORS.login.username }`);
	}

	get password() {
		return $(`~test-${ this.SELECTORS.login.password }`);
	}

	get biometryButton() {
		return $(`~test-${ this.SELECTORS.login.biometry }`);
	}

	get faceRecognition() {
		return $(`~test-${ this.SELECTORS.login.faceRecognition }`);
	}

	get loginButton() {
		return $(`~test-${ this.SELECTORS.login.loginButton }`);
	}

	get errorMessage() {
		return $(`~test-${ this.SELECTORS.login.errors.container }`);
	}

	get standardUser() {
		return $(`~test-${ this.SELECTORS.login.loginText.standard }`);
	}

	get lockedUser() {
		return $(`~test-${ this.SELECTORS.login.loginText.locked }`);
	}

	get problemUser() {
		return $(`~test-${ this.SELECTORS.login.loginText.problem }`);
	}

	///////////////////////////////////////////////////////
	// These selectors are in English because these are the
	// system selectors
	///////////////////////////////////////////////////////
	get iosAllowBiometry() {
		return $('~Don’t Allow');
	}

	get allowBiometry() {
		return $('~OK');
	}

	get iosRetryBiometry() {
		// Sauce Labs (Legacy) RDC mocks iOS in a different then the normal iOS mocking,
		// so it also needs to be treated differently
		if (process.env.RDC) {
			return $('~Cancel');
		}

		return $('~Try Again');
	}

	get androidBiometryAlert() {
		return $('android=new UiSelector().textContains("Please sign in")');
	}

	/**
	 * Submit biometric login
	 *
	 * @param {boolean} successful
	 */
	submitBiometricLogin(successful) {
		// Touch / Face ID needs to be triggered differently on iOS
		if (driver.isIOS) {
			// Determine Face / Touch ID
			return this.submitIosBiometricLogin(successful);
		}

		return this.submitAndroidBiometricLogin(successful ? DEFAULT_PIN : INCORRECT_PIN);
	}

	/**
	 * Verify that the biometric login failed
	 *
	 * return {boolean}
	 */
	isBiometryAlertShown() {
		if (driver.isIOS) {
			return this.iosRetryBiometry.waitForDisplayed({
				// On RDC the alert will not be shown again,
				// so we need to search the reverse here
				reverse: process.env.RDC,
			});
		}

		return this.androidBiometryAlert.waitForDisplayed();
	}

	/**
	 * Submit iOS biometric login
	 *
	 * @param {boolean} successful
	 */
	submitIosBiometricLogin(successful) {
		// Sauce Labs (Legacy) RDC mocks iOS in a different then the normal iOS mocking,
		// so it also needs to be treated differently
		if (process.env.RDC) {
			return driver.touchId(successful);
		}

		this.allowIosBiometricUsage();

		return driver.execute(
			'mobile:sendBiometricMatch',
			{
				type: this.isFaceId() ? 'faceId' : 'touchId',
				match: successful,
			},
		);
	}

	/**
	 * Allow biometric usage on iOS if it isn't already accepted
	 */
	allowIosBiometricUsage() {
		// Wait for the alert
		try {
			this.iosAllowBiometry.waitForDisplayed({ timeout: 3000 });
			this.allowBiometry.click();
		} catch (e) {
			// This means that allow using touch/facID has already been accepted
		}
	}

	/**
	 * Check if this is the biometric login supports FaceID
	 *
	 * @return {boolean}
	 */
	isFaceId() {
		return this.faceRecognition.isDisplayed();
	}

	/**
	 * Submit Android biometric login
	 *
	 * @param {number} fingerprintId
	 */
	submitAndroidBiometricLogin(fingerprintId) {
		this.androidBiometryAlert.waitForDisplayed();

		return driver.fingerPrint(fingerprintId);
	}

	/**
	 * Sign in
	 *
	 * @param {object} userDetails
	 * @param {string} userDetails.username
	 * @param {string} userDetails.password
	 */
	signIn(userDetails = {}) {
		const { password, username } = userDetails;

		if (username && username !== '') {
			this.username.addValue(username);
		}
		if (password && password !== '') {
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
		this.errorMessage.waitForDisplayed({ timeout: DEFAULT_TIMEOUT });

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
