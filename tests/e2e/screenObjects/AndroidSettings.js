import { DEFAULT_PIN } from '../helpers/e2eConstants';

class AndroidSettings {
	/**
	 * Find an element based on text
	 *
	 * @param {String} string
	 *
	 * @return WebdriverIO.Element
	 */
	findAndroidElementByText(string) {
		return $(`android=new UiSelector().textContains("${ string }")`);
	}

	/**
	 * Enable biometric login
	 */
	enableBiometricLogin() {
		// Android Oreo and higher (API 26+) added `locksettings` to ADB to set the pin. So we need to take
		// a different flow Android on lower than OREO
		if (driver.capabilities.deviceApiLevel < 26) {
			// Open the settings screen
			this.executeAdbCommand('am start -a android.settings.SECURITY_SETTINGS');
			this.waitAndClick('Fingerprint');
			this.fingerPrintWizardSevenOrLower(DEFAULT_PIN);
		} else {
			// Open the settings screen and set screen lock to pin
			this.executeAdbCommand(`am start -a android.settings.SECURITY_SETTINGS && locksettings set-pin ${ DEFAULT_PIN }`);
			this.waitAndClick('Fingerprint');
			this.fingerPrintWizardEightOrHigher(DEFAULT_PIN);
		}

		// We need to end this method where we started it, which is the current running app
		// Open the app again
		driver.launchApp();
	}

	/**
	 * Execute the fingerprint wizard for Android 7 or lower
	 *
	 * @param {number} pin
	 */
	fingerPrintWizardSevenOrLower(pin) {
		this.waitAndClick('NEXT');
		this.setPinSevenOrLower(pin);
		this.touchSensorSevenOrLower(pin);
		this.waitAndClick('DONE');
	}

	/**
	 * Enable the finger print through the wizard
	 *
	 * @param {number} pin
	 */
	fingerPrintWizardEightOrHigher(pin) {
		// There is a difference in the order the wizard in Android 10 is executed
		if (driver.capabilities.deviceApiLevel > 28) {
			this.reEnterPin(pin);
			this.waitAndClick('NEXT');
		} else {
			this.waitAndClick('NEXT');
			this.reEnterPin(pin);
		}

		this.touchSensorEightAndHigher(pin);
		this.waitAndClick('DONE');
	}

	/**
	 * Wait and click on an element
	 *
	 * @param {string} string
	 */
	waitAndClick(string) {
		this.findAndroidElementByText(string).waitForDisplayed();
		this.findAndroidElementByText(string).click();
	}

	/**
	 * Re-enter pin and submit screen
	 *
	 * @param {number} pin
	 */
	reEnterPin(pin) {
		this.findAndroidElementByText('Re-enter your PIN').waitForDisplayed();
		this.executeAdbCommand(`input text ${ pin } && input keyevent 66`);
	}

	/**
	 * Set the pin for Android 7 or lower
	 *
	 * @param {number} pin
	 */
	setPinSevenOrLower(pin) {
		this.waitAndClick('Fingerprint + PIN');
		this.waitAndClick('No thanks');
		this.findAndroidElementByText('Choose your PIN').waitForDisplayed();
		this.executeAdbCommand(`input text ${ pin } && input keyevent 66 && input text ${ pin } && input keyevent 66`);
		this.waitAndClick('DONE');
	}

	/**
	 * Touch sensor and enable finger print for Android 7 and lower
	 *
	 * @param {number} pin
	 */
	touchSensorSevenOrLower(pin) {
		// Touch code needs to be a number
		const touchCode = parseInt(pin, 10);

		this.waitAndClick('NEXT');
		this.findAndroidElementByText('Put your finger').waitForDisplayed();
		driver.fingerPrint(touchCode);
		this.findAndroidElementByText('Move your finger').waitForDisplayed();
		driver.fingerPrint(touchCode);
	}

	/**
	 * Touch sensor and enable finger print for Android 8 and higher
	 *
	 * @param {number} pin
	 */
	touchSensorEightAndHigher(pin) {
		// Touch code needs to be a number
		const touchCode = parseInt(pin, 10);

		// Touch the sensor for the first time to trigger finger print
		this.findAndroidElementByText('Touch the sensor').waitForDisplayed();
		driver.fingerPrint(touchCode);

		// Add finger print
		this.findAndroidElementByText('Put your finger').waitForDisplayed();
		driver.fingerPrint(touchCode);

		// Confirm finger print
		this.findAndroidElementByText('Keep lifting').waitForDisplayed();
		driver.fingerPrint(touchCode);
	}

	/**
	 * Execute ADB commands on the device
	 *
	 * @param {string} adbCommand
	 */
	executeAdbCommand(adbCommand) {
		driver.execute(
			'mobile: shell',
			{
				command: adbCommand,
			},
		);
	}
}

export default new AndroidSettings();
