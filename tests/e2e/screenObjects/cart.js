import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';

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

  get items() {
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
      return this.items.find(cartItem => getTextOfElement(cartItem).includes(needle));
    }

    return this.items[ needle ];
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
   * Remove an item from the cart
   *
   * @param {number|string} needle
   *
   * @return {void}
   */
  removeSwagItem(needle){
    return this.swagItem(needle).$(`~test-${SELECTORS.cartContent.cartItem.remove}`).click();
  }

  /**
   * Continue shopping
   *
   * @return {void}
   */
  continueShopping(){
    return this.continueShoppingButton.click();
  }

  /**
   * Go to the checkout process
   *
   * @return {void}
   */
  goToCheckout(){
    return this.checkoutButton.click();
  }
}

export default new CartContent();
