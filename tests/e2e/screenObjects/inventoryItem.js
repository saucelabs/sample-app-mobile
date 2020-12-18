import { getTextOfElement, languageSelectors } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

class InventoryItemScreen extends Base {
	constructor() {
		super(`~test-${ languageSelectors().inventoryItemPage.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.screen }`);
	}

	get imageContainer() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.imageContainer }`);
	}

	get description() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.itemDescription }`);
	}

	get price() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.price }`);
	}

	get addButton() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.addButton }`);
	}

	get removeButton() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.removeButton }`);
	}

	get goBackButton() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.backButton }`);
	}

	/**
	 * Get the description
	 *
	 * @return {string}
	 */
	getSwagDescription() {
		Gestures.scrollToElement({
			element: this.description,
			maxScrolls: 4,
			swipeDirection: 'up',
		});

		return getTextOfElement(this.description);
	}

	/**
	 * Get the price
	 *
	 * @return {string}
	 */
	getSwagPrice() {
		Gestures.scrollToElement({
			element: this.price,
			maxScrolls: 4,
			swipeDirection: 'up',
		});

		return getTextOfElement(this.price);
	}

	/**
	 * Add the item to the cart
	 *
	 * @return {void}
	 */
	addSwagItemToCart() {
		Gestures.scrollToElement({
			element: this.addButton,
			maxScrolls: 4,
			swipeDirection: 'up',
		});
		this.addButton.click();

		// There is a little delay in adding the item to the cart :(
		return driver.pause(250);
	}

	/**
	 * Remove the item from the cart
	 *
	 * @return {void}
	 */
	removeSwagItemFromCart() {
		Gestures.scrollToElement({
			element: this.removeButton,
			maxScrolls: 4,
			swipeDirection: 'up',
		});
		this.removeButton.click();

		// There is a little delay in removing the item to the cart :(
		return driver.pause(250);
	}

	/**
	 * Go back to the all items page
	 *
	 * @return {void}
	 */
	goBackToAllSwagItems() {
		return this.goBackButton.click();
	}
}

export default new InventoryItemScreen();
