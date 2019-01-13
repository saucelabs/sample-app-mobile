import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';

const SCREEN_SELECTOR = `~test-${ SELECTORS.inventoryListPage.screen }`;

class InventoryListScreen extends Base{
  constructor () {
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
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
      return this.swagItems.find(swagItem => getTextOfElement(swagItem).includes(needle));
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
   * Add a swag items to the cart
   *
   * @param {number|string} needle
   *
   * @return {void}
   */
  addSwagItemToCart(needle){
    return this.swagItem(needle).$(`~test-${SELECTORS.inventoryListPage.addButton}`).click();
  }

  /**
   * Remove a swag items from the cart
   *
   * @param {number|string} needle
   *
   * @return {void}
   */
  removeSwagItemFromCart(needle){
    return this.swagItem(needle).$(`~test-${SELECTORS.inventoryListPage.removeButton}`).click();
  }

  /**
   * Open the details of a swag item
   *
   * @param needle
   *
   * @return {void}
   */
  openSwagItemDetails(needle){
    return this.swagItem(needle).click();
  }
}

export default new InventoryListScreen();
