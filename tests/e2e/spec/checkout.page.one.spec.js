import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import CartContent from '../screenObjects/cart';
import AppHeader from '../screenObjects/appHeader';
import CheckoutPageOne from '../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../screenObjects/checkoutPageTwo';
import { LOGIN_USERS, PERSONAL_INFO } from '../helpers/e2eConstants';

describe('Checkout: Your info', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);

    // Add an item to the cart
    InventoryListScreen.waitForIsDisplayed();
    InventoryListScreen.addSwagItemToCart(0);

    // Open the cart
    AppHeader.openCart();
    CartContent.waitForIsDisplayed();

    // Go to checkout page one
    CartContent.goToCheckout();
    CheckoutPageOne.waitForIsDisplayed();
  });

  it('should be able to submit my personal info and proceed the checkout', () => {
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
    CheckoutPageTwo.waitForIsDisplayed();

    expect(CheckoutPageOne.isDisplayed()).toEqual(false, 'The Checkout: Your info screen is still visible.')
  });

  it('should be able to cancel shopping and go to the items overview page', () => {
    CheckoutPageOne.cancelCheckout();
    InventoryListScreen.waitForIsDisplayed();

    expect(CheckoutPageOne.isDisplayed()).toEqual(false, 'The Checkout: Your info screen is still visible.')
  });

  it('should show an error when the first name has not been entered', () => {
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_FIRSTNAME);

    expect(CheckoutPageOne.isErrorMessageDisplayed()).toEqual(true, 'The error message should be diplayed');
    expect(CheckoutPageOne.getErrorMessage()).toContain('Epic sadface: First Name is required', 'The error message is not as expected');
  });

  it('should show an error when the last name has not been entered', () => {
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_LAST_NAME);

    expect(CheckoutPageOne.isErrorMessageDisplayed()).toEqual(true, 'The error message should be diplayed');
    expect(CheckoutPageOne.getErrorMessage()).toContain('Epic sadface: Last Name is required', 'The error message is not as expected');
  });

  it('should show an error when the postal code has not been entered', () => {
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_POSTAL_CODE);

    expect(CheckoutPageOne.isErrorMessageDisplayed()).toEqual(true, 'The error message should be diplayed');
    expect(CheckoutPageOne.getErrorMessage()).toContain('Epic sadface: Postal Code is required', 'The error message is not as expected');
  });
});
