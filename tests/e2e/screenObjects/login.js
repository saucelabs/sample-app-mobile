import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

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
    return $('~test-errorMessages');
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
   * @param {string} username
   * @param {string} password
   */
  signIn(username, password) {
    this.waitForIsDisplayed(this.screen);
    this.username.setValue(username);
    this.password.setValue(password);
    this.loginButton.click();
  }
}

export default new LoginScreen();
