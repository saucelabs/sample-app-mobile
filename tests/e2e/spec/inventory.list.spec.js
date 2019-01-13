import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import ModalSelect from '../screenObjects/sortingModal';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Inventory List Page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsDisplayed();
  });

  it('should contain swag', () => {
    expect(InventoryListScreen.swagItems.length).toBeGreaterThan(0, 'No items are shown');
  });

  it('should be able to select a swag item and open the details page', () => {
    InventoryListScreen.openSwagItemDetails('Bike Light');
    InventoryItemScreen.waitForIsDisplayed();

    expect(InventoryItemScreen.isDisplayed()).toEqual(true, 'The inventory item screen is not shown');
  });

  it('should be able to sort the items', () => {
    // Check the first item is the backpack
    expect(InventoryListScreen.getSwagItemText(0)).toContain('Sauce Labs Backpack', 'Selected item did not match');

    ModalSelect.openSortingModal();
    ModalSelect.selectOption(SELECTORS.modalSelector.zaLabel);

    expect(InventoryListScreen.getSwagItemText(0)).toContain('Test.allTheThings() T-Shirt (Red)', 'Selected item did not match');
  });

  it('should be able to open and close the selecting modal', () => {
    ModalSelect.openSortingModal();
    ModalSelect.cancel.click();

    expect(ModalSelect.isDisplayed()).toEqual(false, 'Sorting modal is still visible');
  });

  it('should be able to add swag to the cart', ()=>{
    InventoryListScreen.addSwagItemToCart(0);
    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.addSwagItemToCart(2);
    expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');
  });

  it('should be able to remove swag from the cart', ()=>{
    InventoryListScreen.addSwagItemToCart(0);
    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.removeSwagItemFromCart(0);
    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });
});
