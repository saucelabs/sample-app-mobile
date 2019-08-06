import SELECTORS from '../../../src/js/config/translations/en';
import Base from './base';
import Gestures from '../helpers/Gestures';
import { sanitizeSelector } from '../helpers/utils';

const SCREEN_SELECTOR = `~test-${ sanitizeSelector(SELECTORS.checkoutCompletePage.screen) }`;

class CheckoutComplete extends Base {
	constructor() {
		super(SCREEN_SELECTOR);
	}

	get screen() {
		return $(SCREEN_SELECTOR);
	}

	get continuesShoppingButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.checkoutCompletePage.goToButton) }`);
	}

	/**
	 * Continue shopping by scrolling to the button and click on it.
	 * The button is not visible on all screens
	 */
	continueShopping() {
		Gestures.scrollDownToElement(this.continuesShoppingButton, 4);

		return this.continuesShoppingButton.click();
	}
}

export default new CheckoutComplete();
