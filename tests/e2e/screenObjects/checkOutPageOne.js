import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';

const SCREEN_SELECTOR = `~test-${ SELECTORS.checkoutPageOne.screen }`;

class CheckOutPageOne extends Base{
  constructor(){
    super(SCREEN_SELECTOR)
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }
}

export default new CheckOutPageOne();
