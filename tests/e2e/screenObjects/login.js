import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { getTextOfElement } from '../helpers/utils';
import Base from './base';

const SCREEN_SELECTOR = `~test-${SELECTORS.login.screen}`;

class LoginScreen extends Base{
  constructor () {
    super(SCREEN_SELECTOR);
  }

  get screen () {
    return $(SCREEN_SELECTOR);
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
