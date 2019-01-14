import * as SELECTORS from '../../../src/js/config/translations/en.json';
import Base from './base';
import { getTextOfElement } from '../helpers/utils';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

const SCREEN_SELECTOR = `~test-${ SELECTORS.checkoutPageOne.screen }`;

class CheckoutPageOne extends Base{
  constructor(){
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get cancelButton(){
    return $(`~test-${SELECTORS.checkoutPageOne.cancelButton}`);
  }

  get continueCheckoutButton(){
    return $(`~test-${SELECTORS.checkoutPageOne.continueButton}`);
  }

  get firstName(){
    return $(`~test-${SELECTORS.checkoutPageOne.firstName}`);
  }

  get lastName(){
    return $(`~test-${SELECTORS.checkoutPageOne.lastName}`);
  }

  get postalCode(){
    return $(`~test-${SELECTORS.checkoutPageOne.postalCode}`);
  }

  get errorMessage(){
    return $(`~test-${SELECTORS.checkoutPageOne.errors.container}`);
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
    const {firstName, lastName, zip} = personalInfo;

    this.waitForIsDisplayed();
    this.firstName.addValue(firstName);
    this.lastName.addValue(lastName);
    this.postalCode.addValue(zip);
    // On smaller devices the keyboard is in front of the submit button, so hide it
    driver.hideKeyboard();
    this.continueCheckoutButton.click();
  }

  /**
   * Get the text or the error message container
   *
   * @return {string}
   */
  getErrorMessage() {
    this.errorMessage.waitForDisplayed(DEFAULT_TIMEOUT);

    return getTextOfElement(this.errorMessage);
  }

  /**
   * Check if the error message is displayed
   *
   * @return {boolean}
   */
  isErrorMessageDisplayed() {
    return this.errorMessage.isDisplayed();
  }

  /**
   * Cancel checkout
   *
   * @return {void}
   */
  cancelCheckout(){
    // On smaller devices the keyboard is in front of the submit button, so hide it
    driver.hideKeyboard();
    return this.cancelButton.click();
  }
}

export default new CheckoutPageOne();
