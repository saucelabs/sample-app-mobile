import Base from './base';
import Gestures from '../helpers/Gestures';
import { languageSelectors } from '../helpers/utils';

class CheckoutComplete extends Base {
	constructor() {
		super(`~test-${ languageSelectors().checkoutCompletePage.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.checkoutCompletePage.screen }`);
	}

	get continuesShoppingButton() {
		return $(`~test-${ this.SELECTORS.checkoutCompletePage.goToButton }`);
	}

	/**
	 * Continue shopping by scrolling to the button and click on it.
	 * The button is not visible on all screens
	 */
	continueShopping() {
		Gestures.scrollToElement({
			element: this.continuesShoppingButton,
			maxScrolls: 4,
			swipeDirection: 'up',
		});

		return this.continuesShoppingButton.click();
	}
}

export default new CheckoutComplete();
