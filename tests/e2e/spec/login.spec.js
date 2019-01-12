import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';

describe('Login', () => {
  it('should be able to login with a standard user', () => {
    LoginScreen.signIn('standard_user', 'secret_sauce');
    InventoryListScreen.waitForScreenIsDisplayed();
  });
});
