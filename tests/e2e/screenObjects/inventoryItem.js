import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';
import { getTextOfElement } from '../helpers/utils';

class InventoryItemScreen {
  get screen() {
    return $(`~test-${ SELECTORS.inventoryItemPage.screen }`);
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
  getDescription(){
    return getTextOfElement(this.description);
  }

  /**
   * Get the price
   *
   * @return {string}
   */
  getPrice(){
    return getTextOfElement(this.price)
  }

  /**
   * Get the text of the selected swag
   *
   * @return {string}
   */
  getSwagItemText(){
    return `${this.getDescription()} ${this.getPrice()}`;
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
  goBackToAllItems(){
    return this.goBackButton.click();
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

  /**
   * The swag items page is not displayed.
   * iOS still has it in it's UI tree, Android doesnt have it anymore
   *
   * @return {boolean}
   */
  swagItemDetailsNotDisplayed() {
    if (driver.isIOS) {
      return this.screen.isDisplayed();
    }

    return this.screen.isExisting();
  }
}

export default new InventoryItemScreen();
