import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import ModalSelect from '../screenObjects/sortingModal';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Swag row overview page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();
  });

  it('should change the default grid layout to row when the layout is toggled', () => {
    expect(InventoryListScreen.isRowLayout()).toEqual(false, 'The layout is already a row layout');
    InventoryListScreen.toggleLayout();

    expect(InventoryListScreen.isRowLayout()).toEqual(true, 'The layout is still a row layout');
  });

  it('should contain swag after changing the layout', () => {
    InventoryListScreen.toggleLayout();

    expect(InventoryListScreen.swagItems.length).toBeGreaterThan(0, 'No items are shown');
  });

  it('should be able to select a swag item and open the details page', () => {
    InventoryListScreen.toggleLayout();
    InventoryListScreen.openSwagItemDetails('Sauce Labs Backpack');

    expect(InventoryItemScreen.waitForIsShown()).toEqual(true, 'The inventory item screen is not shown');
  });

  it('should be able to show the row layout after coming back from the swag items page', () => {
    InventoryListScreen.toggleLayout();
    InventoryListScreen.openSwagItemDetails('Sauce Labs Backpack');

    expect(InventoryItemScreen.waitForIsShown()).toEqual(true, 'The inventory item screen is not shown');

    InventoryItemScreen.goBackToAllSwagItems();

    expect(InventoryItemScreen.waitForIsNotShown()).toEqual(true, 'The inventory item screen is still shown');

    expect(InventoryListScreen.isRowLayout()).toEqual(true, 'The layout is turned back to a grid layout');
  });

  it('should be able to sort the items and keep the row layout', () => {
    InventoryListScreen.toggleLayout();
    // Check the first item is the backpack
    expect(InventoryListScreen.getSwagItemLabelText(0)).toContain('Sauce Labs Backpack', 'Selected item did not match');

    ModalSelect.openSortingModal();
    ModalSelect.selectOption(SELECTORS.modalSelector.zaLabel);

    expect(InventoryListScreen.getSwagItemLabelText(0)).toContain('Test.allTheThings() T-Shirt (Red)', 'Selected item did not match');
    expect(InventoryListScreen.isRowLayout()).toEqual(true, 'The layout is still a row layout');
  });

  it('should be able to open and close the selecting modal', () => {
    InventoryListScreen.toggleLayout();
    ModalSelect.openSortingModal();
    ModalSelect.cancel.click();

    expect(ModalSelect.waitForIsNotShown()).toEqual(true, 'Sorting modal is still visible');
  });

  it('should be able to add swag to the cart', () => {
    InventoryListScreen.toggleLayout();
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.addSwagItemToCart('Sauce Labs Bike Light');

    expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');
  });

  it('should be able to remove swag from the cart', () => {
    InventoryListScreen.toggleLayout();
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryListScreen.removeSwagItemFromCart('Sauce Labs Backpack');

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });
});
