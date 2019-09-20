import { getTextOfElement } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';
import SELECTORS from '../../../src/js/config/translations/en';

class InventoryItemScreen extends Base {
	constructor() {
		super(`~test-${ driver.selectors.inventoryItemPage.screen }`);
	}

	get SELECTORS(){
		return driver.selectors;
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.inventoryItemPage.screen }`);
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
		Gestures.scrollDownToElement(this.description, 4);

		return getTextOfElement(this.description);
	}

	/**
	 * Get the price
	 *
	 * @return {string}
	 */
	getSwagPrice() {
		Gestures.scrollDownToElement(this.price, 4);

		return getTextOfElement(this.price);
	}

	/**
	 * Add the item to the cart
	 *
	 * @return {void}
	 */
	addSwagItemToCart() {
		Gestures.scrollDownToElement(this.addButton, 4);
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
		Gestures.scrollDownToElement(this.removeButton, 4);
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
