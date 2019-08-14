import { restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';

describe('Touch / Face ID', () => {
	beforeEach(() => {
		restartApp();
		LoginScreen.waitForIsShown();

		// If the biometry is not shown on iOS, enable it on the phone
		if (driver.isIOS && !LoginScreen.biometryButton.isDisplayed()) {
			// enable it
			driver.toggleEnrollTouchId(true);
			// restart the app
			restartApp();
			// Wait for the button to be shown
			LoginScreen.biometryButton.waitForDisplayed(45000);
		}
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
