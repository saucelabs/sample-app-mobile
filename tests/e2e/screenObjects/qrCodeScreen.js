import Base from './base';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

class QrCodeScreen extends Base {
	constructor() {
		super(`~test-${ driver.selectors.qrCodeScanner.screen }`);
	}
	get SELECTORS(){
		return driver.selectors;
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.qrCodeScanner.screen }`);
	}

	get acceptCameraButton(){
		const okButtonSelector = 'type == \'XCUIElementTypeButton\' && name == \'OK\'';

		return $(`-ios predicate string:${ okButtonSelector }`);
	}

	get denyCameraButton(){
		const denyButtonSelector = 'type == \'XCUIElementTypeButton\' && name == \'Don\'t Allow\'';

		return $(`-ios predicate string:${ denyButtonSelector }`);
	}

	acceptCameraAccess(){
		try {
			this.acceptCameraButton.waitForExist(DEFAULT_TIMEOUT);
			this.acceptCameraButton.click();
		} catch (e) {
			// Do nothing, the alert was not shown
		}
	}
}

export default new QrCodeScreen();
