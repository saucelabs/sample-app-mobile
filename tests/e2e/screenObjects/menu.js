import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

const SCREEN_SELECTOR = `~test-${ SELECTORS.menu.allItems }`;

class Menu extends Base {
  constructor() {
    // The `all items` is used for that because there is no other way to determine that
    // the menu container
    super(SCREEN_SELECTOR);
  }

  get button() {
    return $(`~test-${ SELECTORS.menu.label }`);
  }

  get allItems() {
    return $(SCREEN_SELECTOR);
  }

  get about() {
    return $(`~test-${ SELECTORS.menu.about }`);
  }

  get logout() {
    return $(`~test-${ SELECTORS.menu.logout }`);
  }

  get resetAppState() {
    return $(`~test-${ SELECTORS.menu.reset }`);
  }

  /**
   * Open the menu
   *
   * @return {void}
   */
  open() {
    // Open the menu
    this.button.click();

    return this.waitUntilOpened();
  }

  /**
   * Check if the menu is open
   *
   * @return {boolean}
   */
  isOpen() {
    // For iOS we can check the visibility
    if (driver.isIOS) {
      return this.allItems.isDisplayed();
    }

    // For Android we need to check if one of the menu items it's x position is inside the screen,
    // if so, the menu is open, of not it's closed
    return driver.getElementRect(this.allItems.elementId).x > 0;
  }

  /**
   * Wait until the menu is closed
   *
   * @return {void}
   */
  waitUntilClosed() {
    // For iOS we can wait until an menu item is not visible anymore
    if (driver.isIOS) {
      return driver.waitUntil(() => !this.allItems.isDisplayed());
    }

    // For Android we need to do some complex stuff
    return driver.waitUntil(
      () => !this.allItems.isExisting() || driver.getElementRect(this.allItems.elementId).x <= 0,
      DEFAULT_TIMEOUT,
      `The menu didn't close in the default timeout of ${ DEFAULT_TIMEOUT } milliseconds`,
      100,
    );
  }

  /**
   * Wait until the menu is opened
   *
   * @return {void}
   */
  waitUntilOpened() {
    // For iOS we can check if a menu item is visible
    if (driver.isIOS) {
      return driver.waitUntil(() => this.allItems.isDisplayed(), DEFAULT_TIMEOUT);
    }

    // For Android we need to do a complex thing :(
    let previousPosition;
    let retryAmount = 0;

    return driver.waitUntil(
      () => {
        const currentCoordinate = driver.getElementRect(this.allItems.elementId).x;

        if ((previousPosition === currentCoordinate) && retryAmount <= 1) {
          ++retryAmount;
        }
        if (retryAmount > 1) {
          return true;
        }

        previousPosition = currentCoordinate;

        return false;
      },
      DEFAULT_TIMEOUT,
      `The menu didn't open in the default timeout of ${ DEFAULT_TIMEOUT } milliseconds`,
      100,
    );
  }

  /**
   * Close the menu
   *
   * @return {void}
   */
  close() {
    this._menuClick(this.button);

    return this.waitUntilClosed();
  }

  /**
   * Click on the all items menu item
   *
   * @return {void}
   */
  openAllItems() {
    this._menuClick(this.allItems);

    return this.waitUntilClosed();
  }

  /**
   * Click on the about menu item
   *
   * @return {void}
   */
  openAbout() {
    return this._menuClick(this.about);
  }

  /**
   * Click on the logout menu item
   *
   * @return {void}
   */
  clickOnLogout() {
    this._menuClick(this.logout);

    return this.waitUntilClosed();
  }

  /**
   * Click on the reset menu item
   *
   * @return {void}
   */
  clickOnReset() {
    this._menuClick(this.resetAppState);

    return this.waitUntilClosed();
  }

  /**
   * A custom implementation of the menu click because iOS needs a custom implementation
   *
   * @param {Element} element
   *
   * @return {void}
   *
   * @private
   */
  _menuClick(element) {
    if (driver.isIOS) {
      return driver.execute('mobile: tap',
        {
          element: element.elementId,
          x: 10,
          y: 10,
        },
      );
    }

    return element.click();
  }

}

export default new Menu();
