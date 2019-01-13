import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';
import { getTextOfElement } from '../helpers/utils';

class InventoryListScreen {
  get screen() {
    return $(`~test-${ SELECTORS.inventoryListPage.screen }`);
  }

  get swagItems() {
    return $$(`~test-${ SELECTORS.inventoryListPage.itemContainer }`);
  }

  /**
   * Get a swag Item based on a search string or a number of the visible items
   *
   * @param {number|string} needle
   *
   * @return the selected swagItem
   */
  swagItem(needle) {
    if (typeof needle === 'string') {
      return this.swagItems.find(swagItem => getTextOfElement(swagItem).includes(needle))
    }

    return this.swagItems[ needle ];
  }

  /**
   * Get the text of the swag item text
   *
   * @param {number|string} needle
   *
   * @return {string}
   */
  getSwagItemText(needle){
    return getTextOfElement(this.swagItem(needle));
  }

  /**
   * Wait for the inventory list screen to be displayed
   *
   * @param {boolean} isShown
   *
   * @return {boolean}
   */
  waitForScreenIsDisplayed(isShown = true) {
    return this.screen.waitForDisplayed(DEFAULT_TIMEOUT, !isShown);
  }
}

export default new InventoryListScreen();
