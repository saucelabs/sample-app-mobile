import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';
import { getTextOfElement } from '../helpers/utils';

const SCREEN_SELECTOR = `~test-${ SELECTORS.checkoutPageTwo.screen }`;

class CheckoutPageTwo extends Base{
  constructor(){
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  description(needle){
    return this.swagItem(needle).$(`~test-${SELECTORS.checkoutPageTwo.item.description}`);
  }

  price(needle){
    return this.swagItem(needle).$(`~test-${SELECTORS.checkoutPageTwo.item.price}`);
  }

  get cancelButton(){
    return $(`~test-${SELECTORS.checkoutPageTwo.cancelButton}`);
  }

  get finishButton(){
    return $(`~test-${SELECTORS.checkoutPageTwo.finishButton}`);
  }

  get items() {
    return $$(`~test-${ SELECTORS.checkoutPageTwo.item.container }`);
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
   * Get the text of the cart
   *
   * @param {number|string} needle
   *
   * @return {string}
   */
  getSwagItemText(needle){
    return `${getTextOfElement(this.description(needle))} ${getTextOfElement(this.price(needle))}`;
  }

  /**
   * Cancel checkout
   *
   * @return {void}
   */
  cancelCheckout(){
    return this.cancelButton.click();
  }

  /**
   * Finsh checkout
   *
   * @return {void}
   */
  finishCheckout(){
    return this.finishButton.click();
  }
}

export default new CheckoutPageTwo();
