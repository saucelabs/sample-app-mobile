import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';

class AppHeader {
  get cart() {
    return $(`~test-${ SELECTORS.cart.label }`);
  }

  /**
   * Get the cart amount
   *
   * @return {string}
   */
  getCartAmount(){
    return getTextOfElement(this.cart);
  }
}

export default new AppHeader();
