import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

class InventoryListScreen {
  get screen () {
    return $(`~test-${SELECTORS.inventoryListPage.screen}`);
  }

  /**
   * Wait for the inventory list screen to be displayed
   *
   * @param {boolean} isShown
   *
   * @return {boolean}
   */
  waitForScreenIsDisplayed (isShown = true) {
    return this.screen.waitForDisplayed(DEFAULT_TIMEOUT, !isShown);
  }
}

export default new InventoryListScreen();
