import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';
import Gestures from '../helpers/Gestures';

const SCREEN_SELECTOR = `~test-${ SELECTORS.cartContent.screen }`;

class CartContent extends Base{
  constructor(){
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get checkoutButton(){
    return $(`~test-${SELECTORS.cartContent.checkout}`);
  }

  get continueShoppingButton(){
    return $(`~test-${SELECTORS.cartContent.continueShopping}`);
  }

  get swagItems() {
    return $$(`~test-${ SELECTORS.cartContent.cartItem.itemContainer }`);
  }

  /**
   * Get a cart Item based on a search string or a number of the visible items
   *
   * @param {number|string} needle
   *
   * @return the selected cart item
   */
  swagItem(needle) {
    if (typeof needle === 'string') {
      return this.swagItems.find(cartItem => getTextOfElement(cartItem).includes(needle));
    }

    return this.swagItems[ needle ];
  }

  /**
   * Get the text of the cart item text
   *
   * @param {number|string} needle
   *
   * @return {string}
   */
  getSwagItemText(needle){
    return getTextOfElement(this.swagItem(needle));
  }

  /**
   * Remove the first item from the cart
   *
   * @return {void}
   */
  removeSwagItem(){
    return this.swagItems[0].$(`~test-${SELECTORS.cartContent.cartItem.remove}`).click();
  }

  /**
   * Continue shopping
   *
   * @return {void}
   */
  continueShopping(){
    Gestures.scrollDownToElement(this.continueShoppingButton);

    return this.continueShoppingButton.click();
  }

  /**
   * Go to the checkout process
   *
   * @return {void}
   */
  goToCheckout(){
    Gestures.scrollDownToElement(this.checkoutButton);

    return this.checkoutButton.click();
  }
}

export default new CartContent();
