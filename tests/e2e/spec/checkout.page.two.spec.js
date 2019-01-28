import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import CartContent from '../screenObjects/cart';
import AppHeader from '../screenObjects/appHeader';
import CheckoutPageOne from '../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../screenObjects/checkoutPageTwo';
import CheckoutComplete from '../screenObjects/checkoutComplete';
import { LOGIN_USERS, PERSONAL_INFO } from '../helpers/e2eConstants';

let selectedSwagItemText;

describe('Checkout: Overview', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);

    // Add an item to the cart
    InventoryListScreen.waitForIsShown();
    selectedSwagItemText = InventoryListScreen.getSwagItemLabelText(0);
    InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

    // Open the cart
    AppHeader.openCart();
    CartContent.waitForIsShown();

    // Go to checkout page one
    CartContent.goToCheckout();
    CheckoutPageOne.waitForIsShown();

    // Submit the personal info
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
    CheckoutPageTwo.waitForIsShown();
  });

  it('should show the correct selected item in the overview', () => {
    expect(CheckoutPageTwo.getSwagItemText(0)).toContain(selectedSwagItemText, 'The selected swag item is not equal.');
  });

  it('should be able to finish the checkout', () => {
    CheckoutPageTwo.finishCheckout();
    CheckoutComplete.waitForIsShown();

    expect(CheckoutPageTwo.isShown()).toEqual(false, 'The Checkout: Overview screen is still visible.');
  });
});
