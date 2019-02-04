import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';
import { getTextOfElement, hideKeyboard } from '../helpers/utils';
import Gestures from '../helpers/Gestures';

const SCREEN_SELECTOR = `~test-${ SELECTORS.checkoutPageOne.screen }`;

class CheckoutPageOne extends Base {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get cancelButton() {
    return $(`~test-${ SELECTORS.checkoutPageOne.cancelButton }`);
  }

  get continueCheckoutButton() {
    return $(`~test-${ SELECTORS.checkoutPageOne.continueButton }`);
  }

  get firstName() {
    return $(`~test-${ SELECTORS.checkoutPageOne.firstName }`);
  }

  get lastName() {
    return $(`~test-${ SELECTORS.checkoutPageOne.lastName }`);
  }

  get postalCode() {
    return $(`~test-${ SELECTORS.checkoutPageOne.postalCode }`);
  }

  get errorMessage() {
    return $(`~test-${ SELECTORS.checkoutPageOne.errors.container }`);
  }

  /**
   * Submit personal info
   *
   * @param {object} personalInfo
   * @param {string} personalInfo.firstName
   * @param {string} personalInfo.lastName
   * @param {string} personalInfo.postalCode
   */
  submitPersonalInfo(personalInfo) {
    const { firstName, lastName, zip } = personalInfo;

    this.waitForIsShown();

    if (firstName !== '') {
      this.firstName.addValue(firstName);
    }
    if (lastName !== '') {
      this.lastName.addValue(lastName);
    }
    if (zip !== '') {
      this.postalCode.addValue(zip);
    }

    // On smaller devices the keyboard is in front of the submit button, so hide it
    hideKeyboard(this.firstName);
    // Check if the button is visible, if not scroll to it
    Gestures.scrollDownToElement(this.continueCheckoutButton, 2);
    // Click on the button
    this.continueCheckoutButton.click();
  }

  /**
   * Get the text or the error message container
   *
   * @return {string}
   */
  getErrorMessage() {
    this.waitForIsShown(this.errorMessage);

    return getTextOfElement(this.errorMessage);
  }

  /**
   * Check if the error message is shown
   *
   * @return {boolean}
   */
  isErrorMessageShown() {
    return this.isShown(this.errorMessage);
  }

  /**
   * Cancel checkout
   *
   * @return {void}
   */
  cancelCheckout() {
    // On smaller devices the keyboard is in front of the submit button, so hide it
    hideKeyboard(this.firstName);
    Gestures.scrollDownToElement(this.cancelButton, 2);
    return this.cancelButton.click();
  }
}

export default new CheckoutPageOne();
