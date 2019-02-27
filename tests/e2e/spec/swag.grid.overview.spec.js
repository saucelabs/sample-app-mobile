import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import ModalSelect from '../screenObjects/sortingModal';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Swag grid overview page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();
  });

  it('should show the grid layout by default', () => {
    expect(InventoryListScreen.isGridLayout()).toEqual(true, 'The default layout is not the grid layout');
  });

  it('should contain swag', () => {
    expect(InventoryListScreen.swagItems.length).toBeGreaterThan(0, 'No items are shown');
  });

  it('should be able to select a swag item and open the details page', () => {
    InventoryListScreen.openSwagItemDetails('Sauce Labs Backpack');

    expect(InventoryItemScreen.waitForIsShown()).toEqual(true, 'The inventory item screen is not shown');
  });

  it('should be able to keep the grid layout after coming back from the swag items page', () => {
    InventoryListScreen.openSwagItemDetails('Sauce Labs Backpack');

    expect(InventoryItemScreen.waitForIsShown()).toEqual(true, 'The inventory item screen is not shown');

    InventoryItemScreen.goBackToAllSwagItems();

    expect(InventoryItemScreen.waitForIsNotShown()).toEqual(true, 'The inventory item screen is still shown');

    expect(InventoryListScreen.isGridLayout()).toEqual(true, 'The layout is turned back to a row layout');
  });

  it('should be able to sort the items and keep the default layout', () => {
    // Check the first item is the backpack
    expect(InventoryListScreen.getSwagItemLabelText(0)).toContain('Sauce Labs Backpack', 'Selected item did not match');

    ModalSelect.openSortingModal();
    ModalSelect.selectOption(SELECTORS.modalSelector.zaLabel);

    expect(InventoryListScreen.getSwagItemLabelText(0)).toContain('Test.allTheThings() T-Shirt (Red)', 'Selected item did not match');
    expect(InventoryListScreen.isGridLayout()).toEqual(true, 'The layout is still a row layout');
  });

  it('should be able to open and close the selecting modal', () => {
    ModalSelect.openSortingModal();
    ModalSelect.cancel.click();

    expect(ModalSelect.waitForIsNotShown()).toEqual(true, 'Sorting modal is still visible');
  });

  it('should be able to add swag to the cart', ()=>{
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.addSwagItemToCart('Sauce Labs Bike Light');

    expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');
  });

  it('should be able to remove swag from the cart', ()=>{
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.removeSwagItemFromCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });
});
