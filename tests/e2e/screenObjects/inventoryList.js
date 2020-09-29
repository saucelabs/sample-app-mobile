import { getTextOfElement } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

class InventoryListScreen extends Base {
	constructor() {
		super(`~test-${ driver.selectors.inventoryListPage.screen }`);
	}

	get SELECTORS() {
		return driver.selectors;
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
		Gestures.scrollDownToElement(elm);

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
		Gestures.scrollDownToElement(swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.addButton }`), 10);

		swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.addButton }`).click();

		// there is a small delay in adding items in the cart
		return driver.pause(250);
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
		Gestures.scrollDownToElement(swagItemDragHandle, 10);

		const dropZoneRec = driver.getElementRect($(`~test-${ this.SELECTORS.inventoryListPage.dropZone }`).elementId);
		const dragElementRec = driver.getElementRect(swagItemDragHandle.elementId);

		// See http://appium.io/docs/en/commands/interactions/actions/#actions
		driver.performActions([ {
			type: 'pointer',
			id: 'finger1',
			parameters: { pointerType: 'touch' },
			actions: [
				// Pick the center of the draggable element
				{
					type: 'pointerMove',
					duration: 0,
					x: dragElementRec.x + dragElementRec.width / 2,
					y: dragElementRec.y + dragElementRec.height / 2,
				},
				{ type: 'pointerDown', button: 0 },
				{ type: 'pause', duration: 250 },
				// Finger moves a small amount very quickly to trigger the event
				{
					type: 'pointerMove',
					duration: 1,
					x: dragElementRec.x + dragElementRec.width / 2,
					y: dragElementRec.y + dragElementRec.height / 2 - 10,
				},
				{ type: 'pause', duration: 100 },
				// Move it to the center of the drop zone
				{
					type: 'pointerMove',
					duration: 250,
					x: dropZoneRec.x + dropZoneRec.width / 2,
					y: dropZoneRec.y + dropZoneRec.height / 2,
				},
				{ type: 'pointerUp', button: 0 },
			],
		} ]);

		// there is a small delay in adding items in the cart
		return driver.pause(250);
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
		Gestures.scrollDownToElement(swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.removeButton }`), 10);

		swagItem.$(`~test-${ this.SELECTORS.inventoryListPage.removeButton }`).click();

		// there is a small delay in adding items in the cart
		return driver.pause(250);
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
		return driver.pause(500);
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
