import { getTextOfElement, languageSelectors } from '../helpers/utils';

class AppHeader {
	get SELECTORS(){
		return languageSelectors();
	}

	get cart() {
		return $(`~test-${ this.SELECTORS.cart.label }`);
	}

	/**
	 * Get the cart amount
	 *
	 * @return {string}
	 */
	getCartAmount() {
		// There is a little delay in adding / removing data from the cart
		driver.pause(100);

		return getTextOfElement(this.cart);
	}

	/**
	 * Open the cart
	 *
	 * @return {void}
	 */
	openCart() {
		return this.cart.click();
	}
}

export default new AppHeader();
