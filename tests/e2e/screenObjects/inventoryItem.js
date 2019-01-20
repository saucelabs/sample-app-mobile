import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';

const SCREEN_SELECTOR = `~test-${ SELECTORS.inventoryItemPage.screen }`;

class InventoryItemScreen extends Base{
  constructor () {
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get description(){
    return $(`~test-${SELECTORS.inventoryItemPage.itemDescription}`);
  }

  get price(){
    return $(`~test-${SELECTORS.inventoryItemPage.price}`);
  }

  get addButton(){
    return $(`~test-${SELECTORS.inventoryItemPage.addButton}`);
  }

  get removeButton(){
    return $(`~test-${SELECTORS.inventoryItemPage.removeButton}`);
  }

  get goBackButton(){
    return $(`~test-${SELECTORS.inventoryItemPage.backButton}`);
  }

  /**
   * Get the description
   *
   * @return {string}
   */
  getSwagDescription(){
    return getTextOfElement(this.description);
  }

  /**
   * Get the price
   *
   * @return {string}
   */
  getSwagPrice(){
    return getTextOfElement(this.price);
  }

  /**
   * Get the text of the selected swag
   *
   * @return {string}
   */
  getSwagItemText(){
    return `${this.getSwagDescription()} ${this.getSwagPrice()}`;
  }

  /**
   * Add the item to the cart
   *
   * @return {void}
   */
  addSwagItemToCart(){
    this.addButton.click();

    // There is a little delay in adding the item to the cart :(
    return driver.pause(100);
  }

  /**
   * Remove the item from the cart
   *
   * @return {void}
   */
  removeSwagItemFromCart(){
    this.removeButton.click();

    // There is a little delay in removing the item to the cart :(
    return driver.pause(100);
  }

  /**
   * Go back to the all items page
   *
   * @return {void}
   */
  goBackToAllSwagItems(){
    return this.goBackButton.click();
  }
}

export default new InventoryItemScreen();
