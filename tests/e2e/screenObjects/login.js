import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';
import { getTextOfElement } from '../helpers/utils';

class LoginScreen {
  get screen () {
    return $(`~test-${SELECTORS.login.screen}`);
  }

  get username () {
    return $(`~test-${SELECTORS.login.username}`);
  }

  get password () {
    return $(`~test-${SELECTORS.login.password}`);
  }

  get loginButton () {
    return $(`~test-${SELECTORS.login.loginButton}`);
  }

  get errorMessage () {
    return $(`~test-${SELECTORS.login.errorMessage}`);
  }

  /**
   * Wait for the element to be displayed
   *
   * @param {Element} element
   * @param {boolean} isShown
   *
   * @return {boolean}
   */
  waitForIsDisplayed (element, isShown = true) {
    return element.waitForDisplayed(DEFAULT_TIMEOUT, !isShown);
  }

  /**
   * Sign in
   *
   * @param {object} userDetails
   * @param {string} userDetails.username
   * @param {string} userDetails.password
   */
  signIn(userDetails) {
    const {password, username} = userDetails;

    this.waitForIsDisplayed(this.screen);
    this.username.setValue(username);
    this.password.setValue(password);
    this.loginButton.click();
  }

  /**
   * Get the text or the error message container
   *
   * @return {string}
   */
  getErrorMessage(){
    this.waitForIsDisplayed(this.errorMessage);
    return getTextOfElement(this.errorMessage);
  }
}

export default new LoginScreen();
