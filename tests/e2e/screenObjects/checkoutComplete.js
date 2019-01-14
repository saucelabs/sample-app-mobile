import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';

const SCREEN_SELECTOR = `~test-${ SELECTORS.checkoutCompletePage.screen }`;

class CheckoutComplete extends Base{
  constructor(){
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get continuesShoppingButton(){
    return $(`~test-${SELECTORS.checkoutCompletePage.goToButton}`);
  }
}

export default new CheckoutComplete();
