import { getTextOfElement, languageSelectors } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

class InventoryListScreen extends Base {
	constructor() {
		super(`~test-${ languageSelectors().inventoryListPage.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.inventoryListPage.screen }`);
	}

	get swagItems() {
		return $$(`~test-${ this.SELECTORS.inventoryListPage.itemContainer }`);
	}

	get toggle() {
		return $(`~test-${ this.SELECTORS.inventoryListPage.toggle }`);
	}

	/**
	 * Get a swag Item based on a search string
	 * By default the scroll is down, but can also be up
	 *
	 * @param {string} needle
	 * @param {boolean} scrollUp
	 *
	 * @return the selected swagItem
	 */
	swagItem(needle, scrollUp = false) {
		return this.findParentElementByText(`test-${ this.SELECTORS.inventoryListPage.itemContainer }`, needle, scrollUp);
	}

	/**
	 * Get the label text of the swag item, the needle needs to be of the shown swag item in the screen
	 *
	 * @param {number} needle
	 *
	 * @return {string}
	 */
	getSwagItemLabelText(needle) {
		const elm = this.swagItems[ needle ].$(`~test-${ this.SELECTORS.inventoryListPage.itemTitle }`);
		Gestures.scrollToElement({ element: elm, swipeDirection: 'up' });

		return getTextOfElement(elm);
	}

	/**
	 * Add a swag items to the cart
	 *
	 * @param {string} needle
	 *
	 * @return {void}
	 */
	addSwagItemToCart(needle) {
		const swagItem = this.swagItem(needle);
		Gestures.scrollToElement({
			element: swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.addButton }`),
			maxScrolls: 10,
			swipeDirection: 'up',
		});

		swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.addButton }`).click();

		// there is a small delay in adding items in the cart
		return driver.pause(750);
	}

	/**
	 * Drag a swag items to the cart
	 *
	 * @param {string} needle
	 *
	 * @return {void}
	 */
	dragSwagItemToCart(needle) {
		const swagItemDragHandle = this.swagItem(needle).$(`~test-${ this.SELECTORS.inventoryListPage.dragHandle }`);
		Gestures.scrollToElement({
			element: swagItemDragHandle,
			maxScrolls: 10,
			swipeDirection: 'up',
		});

		Gestures.dragAndDrop(swagItemDragHandle, $(`~test-${ this.SELECTORS.inventoryListPage.dropZone }`));

		// there is a small delay in adding items in the cart
		return driver.pause(750);
	}

	/**
	 * Remove a swag items from the cart
	 *
	 * @param {string} needle
	 *
	 * @return {void}
	 */
	removeSwagItemFromCart(needle) {
		const swagItem = this.swagItem(needle);
		Gestures.scrollToElement({
			element: swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.removeButton }`),
			maxScrolls: 10,
			swipeDirection: 'up',
		});

		swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.removeButton }`).click();

		// there is a small delay in adding items in the cart
		return driver.pause(750);
	}

	/**
	 * Open the details of a swag item.
	 * By default the scroll is down, but can also be up
	 *
	 * @param {string} needle
	 * @param {boolean} scrollUp
	 *
	 * @return {void}
	 */
	openSwagItemDetails(needle, scrollUp = false) {
		return this.swagItem(needle, scrollUp).click();
	}

	/**
	 * Toggle the layout
	 *
	 * @return {void}
	 */
	toggleLayout() {
		this.toggle.click();
		// There is a delay, this can only be done with a hard sleep :(
		return driver.pause(750);
	}

	/**
	 * Check if the the layout is a row layout
	 *
	 * @return {boolean}
	 */
	isRowLayout() {
		try {
			return this.swagItems[ 0 ].$(`~${ `test-${ this.SELECTORS.inventoryListPage.itemDescription }` }`).isDisplayed();
		} catch (e) {
			return false;
		}
	}

	/**
	 * Check if the the layout is a grid layout
	 *
	 * @return {boolean}
	 */
	isGridLayout() {
		return !this.isRowLayout();
	}

	/**
	 * Find a swag item container element based on text.
	 * This is a very heavy methods because it uses XPATH
	 * By default the scroll is down, but can also be up
	 *
	 * @param {string} selector
	 * @param {string} needle
	 * @param {boolean} scrollUp
	 * @param {number} maxScrolls
	 *
	 * @return {Element}
	 */
	findParentElementByText(selector, needle, scrollUp = false, maxScrolls = 10) {
		for (let i = 0; i < maxScrolls; i++) {
			const classChain = '-ios class chain:';
			const iosItemQuery = `name CONTAINS "${ this.SELECTORS.inventoryListPage.itemContainer }"`;
			const iosNeedleQuery = `name CONTAINS "${ needle }"`;
			const iosButtonTextQuery = `name CONTAINS "${ this.SELECTORS.inventoryItemPage.addButton }" OR name CONTAINS "${ this.SELECTORS.inventoryItemPage.removeButton }"`;
			const iosSignQuery = 'name CONTAINS "+" OR name CONTAINS "-"';
			const iosSelector = `${ classChain }**/XCUIElementTypeOther[\`${ iosItemQuery }\`]/**/XCUIElementTypeOther[\`${ iosNeedleQuery } AND (${ iosButtonTextQuery } OR ${ iosSignQuery })\`]`;
			const androidSelector = `//android.widget.TextView[contains(@text,'${ needle }')]//ancestor::*[@content-desc='${ selector }']`;
			const elm = $(driver.isIOS ? iosSelector : androidSelector);

			if (driver.isIOS ? elm.isDisplayed() : elm.isExisting()) {
				return elm;
			}

			if (scrollUp) {
				Gestures.swipeDown(0.50);
			} else {
				Gestures.swipeUp(0.50);
			}
		}
	}
}

export default new InventoryListScreen();
