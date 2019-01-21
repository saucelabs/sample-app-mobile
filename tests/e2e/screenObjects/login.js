import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

const SCREEN_SELECTOR = `~test-${ SELECTORS.login.screen }`;

class LoginScreen extends Base {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  get screen() {
    return $(SCREEN_SELECTOR);
  }

  get username() {
    return $(`~test-${ SELECTORS.login.username }`);
  }

  get password() {
    return $(`~test-${ SELECTORS.login.password }`);
  }

  get loginButton() {
    return $(`~test-${ SELECTORS.login.loginButton }`);
  }

  get errorMessage() {
    return $(`~test-${ SELECTORS.login.errors.container }`);
  }

  /**
   * Sign in
   *
   * @param {object} userDetails
   * @param {string} userDetails.username
   * @param {string} userDetails.password
   */
  signIn(userDetails) {
    const { password, username } = userDetails;

    if (username !== '') {
      this.username.addValue(username);
    }
    if (password !== '') {
      this.password.addValue(password);
    }

    this.loginButton.click();
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
  isErrorMessageIsShown() {
    return this.isShown(this.errorMessage);
  }
}

export default new LoginScreen();
