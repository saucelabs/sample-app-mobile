import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

const SCREEN_SELECTOR = `test-${ SELECTORS.inventoryListPage.screen }`;
const SWAG_ITEM_SELECTOR = `test-${ SELECTORS.inventoryListPage.itemContainer }`;

class InventoryListScreen extends Base {
  constructor() {
    super(`~${SCREEN_SELECTOR}`);
  }

  get screen() {
    return $(`~${SCREEN_SELECTOR}`);
  }

  get swagItems() {
    return $$(`~${SWAG_ITEM_SELECTOR}`);
  }

  /**
   * Get a swag Item based on a search string
   *
   * @param {string} needle
   *
   * @return the selected swagItem
   */
  swagItem(needle) {
    return this.findParentElementByText(SWAG_ITEM_SELECTOR, needle);
  }

  /**
   * Get the text of the swag item, the needle needs to be of the shown swag item in the screen
   *
   * @param {number} needle
   *
   * @return {string}
   */
  getSwagItemText(needle) {
    return getTextOfElement(this.swagItems[needle]);
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
    Gestures.scrollDownToElement(swagItem.$(`~test-${ SELECTORS.inventoryListPage.addButton }`), 10);

    return swagItem.$(`~test-${ SELECTORS.inventoryListPage.addButton }`).click();
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
    Gestures.scrollDownToElement(swagItem.$(`~test-${ SELECTORS.inventoryListPage.removeButton }`), 10);

    return swagItem.$(`~test-${ SELECTORS.inventoryListPage.removeButton }`).click();
  }

  /**
   * Open the details of a swag item
   *
   * @param {string} needle
   *
   * @return {void}
   */
  openSwagItemDetails(needle) {
    return this.swagItem(needle).click();
  }

  /**
   * Find a swag item container element based on text.
   * This is a very heavy methods because it uses XPATH
   *
   * @param {string} selector
   * @param {string} needle
   * @param {number} maxScrolls
   *
   * @return {Element}
   */
  findParentElementByText(selector, needle, maxScrolls = 10) {
    for (let i = 0; i < maxScrolls; i++) {
      const xpathSelector = driver.isIOS ?
        `//XCUIElementTypeStaticText[contains(@value,'${ needle }')]//ancestor::*[@name="${ selector }"]` :
        `//android.widget.TextView[contains(@text,'${ needle }')]//ancestor::*[@content-desc='${ selector }']`;
      const elm = $(xpathSelector);

      if (driver.isIOS ? elm.isDisplayed() : elm.isExisting()) {
        return elm;
      }

      Gestures.swipeUp(0.70);
    }
  }
}

export default new InventoryListScreen();
