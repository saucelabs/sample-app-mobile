import Base from './base';
import Gestures from '../helpers/Gestures';

class CheckoutComplete extends Base {
	constructor() {
		super(`~test-${ driver.selectors.checkoutCompletePage.screen }`);
	}

	get SELECTORS() {
		return driver.selectors;
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
