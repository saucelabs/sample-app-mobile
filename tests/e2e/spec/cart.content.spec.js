import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import CartContent from '../screenObjects/cart';
import AppHeader from '../screenObjects/appHeader';
import CheckOutPageOne from '../screenObjects/checkOutPageOne';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Cart Content Page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);

    // Add some items to the cart
    InventoryListScreen.waitForIsDisplayed();
    InventoryListScreen.addSwagItemToCart(0);
    InventoryListScreen.addSwagItemToCart(1);

    // Open the cart
    AppHeader.openCart();
    CartContent.waitForIsDisplayed();
  });

  it('should show 2 items in the cart', () => {
    expect(CartContent.items.length).toEqual(2, 'The amount of items in the cart is not correct.');
  });

  it('should show the items page if continue shopping is selected', () => {
    CartContent.continueShopping();
    InventoryListScreen.waitForIsDisplayed();

    expect(CartContent.isDisplayed()).toEqual(false, 'The car content page is still visible');
  });

  it('should update the cart if an item is removed', () => {
    expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');

    CartContent.removeItem(1);
    expect(AppHeader.getCartAmount()).toContain(1, 'The amount if items in the cart is not correct.');

    CartContent.removeItem(0);
    expect(AppHeader.getCartAmount()).not.toContain(1, 'The amount if items in the cart is not correct.');
  });

  it('should open the checkout page one page if checkout is clicked', () => {
    CartContent.goToCheckout();
    CheckOutPageOne.waitForIsDisplayed();

    expect(CartContent.isDisplayed()).toEqual(false, 'The cart content page is still visible');
    expect(CheckOutPageOne.isDisplayed()).toEqual(true, 'The checkout page one is not visible');
  });
});
