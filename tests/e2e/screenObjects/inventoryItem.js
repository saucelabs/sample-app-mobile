import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

class InventoryItemScreen {
  get screen() {
    return $(`~test-${ SELECTORS.inventoryItemPage.screen }`);
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

export default new InventoryItemScreen();
