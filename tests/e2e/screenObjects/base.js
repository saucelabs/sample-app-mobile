import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

export default class Base {
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Wait for the element to be shown
   *
   * @param {Element} element
   *
   * @return {boolean}
   */
  waitForIsShown(element = null) {
    return driver.waitUntil(
      () => this.isShown(element),
      DEFAULT_TIMEOUT,
      `The element was not shown within the default timeout of ${ DEFAULT_TIMEOUT }`,
    );
  }

  /**
   * Wait for the element NOT to be displayed
   *
   * @param {Element} element
   *
   * @return {boolean}
   */
  waitForIsNotShown(element = null) {
    return driver.waitUntil(
      () => !this.isShown(element),
      DEFAULT_TIMEOUT,
      `The element was still shown within the default timeout of ${ DEFAULT_TIMEOUT }`,
    );
  }

  /**
   * Give back if the element is displayed
   *
   * @param {Element} element
   *
   * @return {boolean}
   */
  isShown(element) {
    // For android an element that is not visible is also not in the UI tree,
    // so a different approach should be used
    try {
      const el = element || $(this.selector);

      return el.isDisplayed();
    } catch (error) {
      // There looks to be an issue with WebdriverIO and handling the not existence off elements
      // I already created an issue for that. For now we catch the error and return false to not break the test
      return false;

      // throw new Error(error);
    }
  }
}
