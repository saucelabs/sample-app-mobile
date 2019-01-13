import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Inventory List Page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsDisplayed();
  });

  it('should show the details of the selected swag', () => {
    const selectedSwagItemText = InventoryListScreen.getSwagItemText(1);

    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsDisplayed();

    const swagItemDetailsText = InventoryItemScreen.getSwagItemText();

    expect(selectedSwagItemText).toContain(swagItemDetailsText, 'The details of the selected swag item was not correct');
  });

  it('should be able to add a swag item to the cart from the details page', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsDisplayed();

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.addSwagItemToCart();

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');
  });

  it('should be able to remove a swag item from the cart from the details page added in the inventory page', () => {
    InventoryListScreen.addSwagItemToCart(1);
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsDisplayed();

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.removeSwagItemFromCart();

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });

  it('should be able to remove a swag item from the cart from the details page', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsDisplayed();

    InventoryItemScreen.addSwagItemToCart();
    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.removeSwagItemFromCart();
    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });

  it('should be able to get back from the swag details page through the back button', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsDisplayed();

    InventoryItemScreen.goBackToAllItems();
    InventoryListScreen.waitForIsDisplayed();

    expect(InventoryItemScreen.swagItemDetailsNotDisplayed()).toEqual(false, 'The swag items details page should not be visible');
  });
});
