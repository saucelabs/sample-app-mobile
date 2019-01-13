import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

export default class Base {
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Wait for the element to be displayed
   *
   * @return {boolean}
   */
  waitForIsDisplayed() {
    return $(this.selector).waitForDisplayed(DEFAULT_TIMEOUT);
  }

  /**
   * Give back if the element is displayed
   *
   * @return {boolean}
   */
  isDisplayed() {
    return $(this.selector).isDisplayed();
  }

  /**
   * Give back if the element is NOT displayed
   * iOS still has it in it's UI tree, Android doesnt have it anymore
   *
   * @return {boolean}
   */
  isNotDisplayed() {
    if (driver.isIOS) {
      return $(this.selector).isDisplayed();
    }

    return $(this.selector).isExisting();
  }
}
