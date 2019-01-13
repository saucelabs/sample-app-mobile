import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import { restartApp } from '../helpers/utils';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Login', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
  });

  it('should be able to login with a standard user', () => {
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsDisplayed();

    expect(InventoryListScreen.isDisplayed()).toEqual(true, 'Inventory List screen was not shown');
  });

  it('should not be able to login with a locked user', () => {
    LoginScreen.signIn(LOGIN_USERS.LOCKED);

    expect(LoginScreen.getErrorMessage()).toContain(
      'Epic sadface: Username and password do not match any user in this service',
      'The error message is not as expected',
    );
  });

  it('should show an error when no username is provided', () => {
    LoginScreen.signIn(LOGIN_USERS.NO_USER_DETAILS);

    expect(LoginScreen.errorMessage.isDisplayed()).toEqual(true, 'Error message is shown');
    expect(LoginScreen.getErrorMessage()).toContain('Epic sadface: Username is required', 'The error message is not as expected');
  });

  it('should show an error when no password is provided', () => {
    LoginScreen.signIn(LOGIN_USERS.NO_PASSWORD);

    expect(LoginScreen.getErrorMessage()).toContain('Epic sadface: Password is required', 'The error message is not as expected');
  });

});
