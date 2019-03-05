import { browserIsOpened, restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import Menu from '../screenObjects/menu';
import Webview from '../screenObjects/webview';
import { LOGIN_USERS } from '../helpers/e2eConstants';


describe('Menu', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();
  });

  it('should be able to be opened and closed', () => {
    expect(Menu.isOpen()).toEqual(false, 'The menu should not be opened.');

    Menu.open();

    expect(Menu.isOpen()).toEqual(true, 'The menu should be opened.');

    Menu.close();

    expect(Menu.isOpen()).toEqual(false, 'The menu should not be opened.');
  });

  it('should be able to bring me to the all items page', () => {
    InventoryListScreen.openSwagItemDetails('Sauce Labs Backpack');
    InventoryItemScreen.waitForIsShown();
    Menu.open();
    Menu.openAllItems();

    expect(InventoryListScreen.isShown()).toEqual(true, 'All items page is not shown');
  });

  it('should be able to bring me to the webview page', () => {
    Menu.open();
    Menu.openWebview();

    expect(Webview.input.isDisplayed()).toEqual(true, 'Webview page is not shown');
  });

  it('should be able reset the app state', () => {
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).toContain('1', 'The cart amount is not correct.');

    Menu.open();
    Menu.clickOnReset();

    expect(AppHeader.getCartAmount()).not.toContain('1', 'The cart amount is not correct.');
  });

  it('should be able to logout', () => {
    Menu.open();
    Menu.clickOnLogout();
    InventoryListScreen.waitForIsNotShown();

    expect(LoginScreen.isShown()).toEqual(true, 'The login screen is not shown.');
  });

  it('should be able to open the about page and go to a browser', () => {
    Menu.open();
    Menu.openAbout();

    expect(browserIsOpened()).toEqual(true, 'The browser is not opened.');
  });
});
