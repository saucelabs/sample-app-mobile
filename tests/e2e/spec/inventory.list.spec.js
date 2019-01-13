import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import ModalSelect from '../screenObjects/sortingModal';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Inventory List Page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForScreenIsDisplayed();
  });

  it('should contain swag', () => {
    expect(InventoryListScreen.swagItems.length).toBeGreaterThan(0, 'No items are shown');
  });

  it('should be able to select a swag item and open the details page', () => {
    InventoryListScreen.swagItem('Bike Light').click();
    InventoryItemScreen.waitForScreenIsDisplayed();

    expect(InventoryItemScreen.screen.isDisplayed()).toEqual(true, 'The inventory item screen is not shown');
  });

  it('should be able to sort the items', () => {
    // Check the first item is the backpack
    expect(InventoryListScreen.getSwagItemText(0)).toContain('Sauce Labs Backpack', 'Selected item did not match');

    ModalSelect.openSortingModal();
    ModalSelect.z2a.click();

    // There is a sorting delay, this can only be done with a hard sleep :(
    driver.pause(750);

    expect(InventoryListScreen.getSwagItemText(0)).toContain('Test.allTheThings() T-Shirt (Red)', 'Selected item did not match');
  });

  it('should be able to open and close the selecting modal', () => {
    ModalSelect.openSortingModal();
    ModalSelect.cancel.click();

    expect(ModalSelect.sortingModalNotDisplayed()).toEqual(false, 'Sorting modal is still visible');
  });
});
