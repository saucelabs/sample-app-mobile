import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import { restartApp } from '../helpers/utils';

describe('Login', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
  });

  it('should be able to login with a standard user', () => {
    LoginScreen.signIn('standard_user', 'secret_sauce');
    InventoryListScreen.waitForScreenIsDisplayed();

    expect(InventoryListScreen.screen.isDisplayed()).toEqual(true, 'Inventory List screen was not shown');
  });

  it('should not be able to login with a locked user', () => {
    LoginScreen.signIn('locked_user', 'secret_sauce');

    expect(LoginScreen.getErrorMessage()).toContain(
      'Epic sadface: Username and password do not match any user in this service',
      'The error message is not as expected',
    );
  });

  it('should show an error when no username is provided', () => {
    LoginScreen.signIn('', '');

    expect(LoginScreen.errorMessage.isDisplayed()).toEqual(true, 'Error message is shown');
    expect(LoginScreen.getErrorMessage()).toContain('Epic sadface: Username is required', 'The error message is not as expected');
  });

  it('should show an error when no password is provided', () => {
    LoginScreen.signIn('standard_user', '');

    expect(LoginScreen.getErrorMessage()).toContain('Epic sadface: Password is required', 'The error message is not as expected');
  });

});
