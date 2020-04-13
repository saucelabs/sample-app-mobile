import { getText } from 'detox-getprops';
import jestExpect from 'expect';
import LoginScreen from '../screenObjects/login.screen.object';
import SwagItemsScreen from '../screenObjects/swag.items.screen.object';
import { LOGIN_USERS } from '../helpers/e2eConstants';

/**
 * There is an issue in getting text with Detox (https://github.com/wix/detox/issues/445)
 * This test uses a terrible hack (detox-getprops) and `import jestExpect from 'expect';`
 * to get this working
 */

describe('Login', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await expect(LoginScreen.screen).toBeVisible();
  });

  it('should be able to login with a standard user', async () => {
    await LoginScreen.signIn(LOGIN_USERS.STANDARD);
    await expect(SwagItemsScreen.screen).toBeVisible();
  });


  it('should not be able to login with a locked user', async () => {
    await LoginScreen.signIn(LOGIN_USERS.LOCKED);

    jestExpect(await getText(LoginScreen.errorMessage)).toEqual('Sorry, this user has been locked out.');
  });

  it('should show an error when no username is provided', async () => {
    await LoginScreen.signIn(LOGIN_USERS.NO_USER_DETAILS);

    jestExpect(await getText(LoginScreen.errorMessage)).toEqual('Username is required');
  });

  it('should show an error when no password is provided', async () => {
    await LoginScreen.signIn(LOGIN_USERS.NO_PASSWORD);

    jestExpect(await getText(LoginScreen.errorMessage)).toEqual('Password is required');
  });

  it('should show an error when no match is found', async () => {
    await LoginScreen.signIn(LOGIN_USERS.NO_MATCH);

    jestExpect(await getText(LoginScreen.errorMessage)).toEqual('Username and password do not match any user in this service.');
  });
});
