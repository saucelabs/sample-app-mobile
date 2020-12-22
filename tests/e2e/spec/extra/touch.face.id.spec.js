import { restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';
import AndroidSettings from '../../screenObjects/AndroidSettings';

describe('Touch / Face ID', () => {
	beforeEach(() => {
		restartApp();
		LoginScreen.waitForIsShown();

		// If the biometry is not shown on iOS, enable it on the phone
		if (driver.isIOS && !LoginScreen.biometryButton.isDisplayed()) {
			// iOS us pretty straightforward, just enabled it
			driver.toggleEnrollTouchId(true);
			// restart the app
			restartApp();
		} else if (driver.isAndroid && !LoginScreen.biometryButton.isDisplayed()) {
			// Android is more complex, see this method
			AndroidSettings.enableBiometricLogin();
		}

		// Wait for the button to be shown
		LoginScreen.biometryButton.waitForDisplayed();
	});

	it('Should be able to login with a matching touch / face ID', () => {
		LoginScreen.biometryButton.click();
		LoginScreen.submitBiometricLogin(true);

		expect(InventoryListScreen.waitForIsShown()).toEqual(true, 'Inventory List screen was not shown');
	});

	it('Should not be able to login with a non-matching touch / face ID', () => {
		LoginScreen.biometryButton.click();
		LoginScreen.submitBiometricLogin(false);

		expect(LoginScreen.isBiometryAlertShown()).toEqual(true, 'Retry is not shown');
	});
});
