import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import Menu from '../screenObjects/menu';
import Webview, { CONTEXT_REF } from '../screenObjects/webview';
import { LOGIN_USERS } from '../helpers/e2eConstants';
import * as SELECTORS from '../../../src/js/config/translations/en';


describe('Menu', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();
    Menu.open();
    Menu.openWebview();
  });

  it('should be able to see the error message when an incorrect url is being entered', () => {
    Webview.submitURL('http://www.saucelabs.com');

    expect(Webview.getErrorMessage()).toContain(SELECTORS.webview.urlError, 'The error message is not as expected');
  });

  it('should be able open the saucelabs website in the webview', () => {
    Webview.submitURL('https://www.saucelabs.com');
    Webview.waitForWebsiteLoaded();
    // Change the context ton Webview to get the url of the browser
    Webview.switchToContext(CONTEXT_REF.WEBVIEW);

    expect(driver.getUrl()).toContain('https://saucelabs.com', 'Url not as expected');
  });
});
