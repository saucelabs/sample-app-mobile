import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import { restartApp } from '../helpers/utils';
import { LOGIN_USERS } from '../helpers/e2eConstants';
import * as SELECTORS from '../../../src/js/config/translations/en.json';

describe('Login', () => {
  beforeEach(() => {
    restartApp();
    LoginScreen.waitForIsShown();
  });

  it('should be able to login with a standard user', () => {
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();

    expect(InventoryListScreen.isShown()).toEqual(true, 'Inventory List screen was not shown');
  });

  it('should not be able to login with a locked user', () => {
    LoginScreen.signIn(LOGIN_USERS.LOCKED);

    expect(LoginScreen.getErrorMessage()).toContain(SELECTORS.login.errors.lockedOut, 'The error message is not as expected');
  });

  it('should show an error when no username is provided', () => {
    LoginScreen.signIn(LOGIN_USERS.NO_USER_DETAILS);

    expect(LoginScreen.getErrorMessage()).toContain(SELECTORS.login.errors.username, 'The error message is not as expected');
  });

  it('should show an error when no password is provided', () => {
    LoginScreen.signIn(LOGIN_USERS.NO_PASSWORD);

    expect(LoginScreen.getErrorMessage()).toContain(SELECTORS.login.errors.password, 'The error message is not as expected');
  });

  it('should show an error when no match is found', () => {
    LoginScreen.signIn(LOGIN_USERS.NO_MATCH);

    expect(LoginScreen.getErrorMessage()).toContain(SELECTORS.login.errors.noMatch, 'The error message is not as expected');
  });
});
