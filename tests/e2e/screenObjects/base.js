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
   * Wait for the element NOT to be displayed
   *
   * @return {boolean}
   */
  waitForIsNotDisplayed() {
    if (driver.isIOS) {
      return $(this.selector).waitForDisplayed(DEFAULT_TIMEOUT, true);
    }

    return driver.waitUntil(() => !$(this.selector).isExisting(), DEFAULT_TIMEOUT);
  }

  /**
   * Give back if the element is displayed
   *
   * @return {boolean}
   */
  isDisplayed() {
    // For android an element that is not visible is also not in the UI tree,
    // so a different approach should be used
    try {
      return $(this.selector).isDisplayed();
    } catch (error) {
      if (driver.isAndroid) {
        return $(this.selector).isExisting();
      }

      throw new Error(error);
    }
  }
}
