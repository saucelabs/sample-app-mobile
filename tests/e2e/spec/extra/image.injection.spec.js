import { openDeepLinkUrl, restartApp } from '../../helpers/utils';
import {join} from 'path';
import {readFileSync} from 'fs';
import LoginScreen from '../../screenObjects/login';
import QrCodeScreen from '../../screenObjects/qrCodeScreen';

describe('Sauce Labs Image Injection', () => {
	beforeEach(() => {
		restartApp();
		LoginScreen.waitForIsShown();
	});

	it('should be able to scan the QR code and open the Sauce Labs website', () => {
		const qrCodeImage = readFileSync(join(process.cwd(), 'docs/assets/qr-code.png'), 'base64');

		openDeepLinkUrl('qr-code');
		QrCodeScreen.acceptCameraAccess();

		driver.execute(`sauce:inject-image=${qrCodeImage}`);
	});
});
