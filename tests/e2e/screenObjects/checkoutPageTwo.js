import Base from './base';
import { getTextOfElement, languageSelectors } from '../helpers/utils';
import Gestures from '../helpers/Gestures';

class CheckoutPageTwo extends Base {
	constructor() {
		super(`~test-${ languageSelectors().checkoutPageTwo.screen }`);
	}

	get SELECTORS(){
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.checkoutPageTwo.screen }`);
	}

	get cancelButton() {
		return $(`~test-${ this.SELECTORS.checkoutPageTwo.cancelButton }`);
	}

	get finishButton() {
		return $(`~test-${ this.SELECTORS.checkoutPageTwo.finishButton }`);
	}

	get swagItems() {
		return $$(`~test-${ this.SELECTORS.checkoutPageTwo.item.container }`);
	}

	/**
	 * Get a cart Item based on a search string or a number of the visible items
	 *
	 * @param {number|string} needle
	 *
	 * @return the selected cart item
	 */
	swagItem(needle) {
		if (typeof needle === 'string') {
			return this.swagItems.find(cartItem => getTextOfElement(cartItem).includes(needle));
		}

		return this.swagItems[ needle ];
	}

	/**
	 * Get the text of the cart
	 *
	 * @param {number} needle
	 *
	 * @return {string}
	 */
	getSwagItemText(needle) {
		const elm = this.swagItems[ needle ].$(`~test-${ this.SELECTORS.cartContent.cartItem.description }`);
		Gestures.scrollToElement({ element: elm, swipeDirection: 'up' });

		return getTextOfElement(elm);
	}

	/**
	 * Cancel checkout
	 *
	 * @return {void}
	 */
	cancelCheckout() {
		Gestures.scrollToElement({ element: this.cancelButton, swipeDirection: 'up' });

		return this.cancelButton.click();
	}

	/**
	 * Finsh checkout
	 *
	 * @return {void}
	 */
	finishCheckout() {
		Gestures.scrollToElement({ element: this.finishButton, swipeDirection: 'up' });

		return this.finishButton.click();
	}
}

export default new CheckoutPageTwo();
