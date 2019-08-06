import SELECTORS from '../../../src/js/config/translations/en';
import { getTextOfElement, sanitizeSelector } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

const SCREEN_SELECTOR = `~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.screen) }`;

class InventoryItemScreen extends Base {
	constructor() {
		super(SCREEN_SELECTOR);
	}

	get screen() {
		return $(SCREEN_SELECTOR);
	}

	get description() {
		return $(`~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.itemDescription) }`);
	}

	get price() {
		return $(`~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.price) }`);
	}

	get addButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.addButton) }`);
	}

	get removeButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.removeButton) }`);
	}

	get goBackButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.inventoryItemPage.backButton) }`);
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
		return driver.pause(100);
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
		return driver.pause(100);
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
