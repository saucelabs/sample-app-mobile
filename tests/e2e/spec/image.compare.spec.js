import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import { DEFAULT_TIMEOUT, LOGIN_USERS, PERSONAL_INFO } from '../helpers/e2eConstants';
import InventoryListScreen from '../screenObjects/inventoryList';
import AppHeader from '../screenObjects/appHeader';
import ModalSelect from '../screenObjects/sortingModal';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import CartContent from '../screenObjects/cart';
import CheckoutPageOne from '../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../screenObjects/checkoutPageTwo';
import CheckoutComplete from '../screenObjects/checkoutComplete';
import Menu from '../screenObjects/menu';
import Webview from '../screenObjects/webview';

describe('Image compare for upgrade', () => {
  beforeEach(() => {
    restartApp();
    LoginScreen.waitForIsShown();
  });

  describe('Login screen', () => {
    it('should able to compare a screenshot of the default login screen', () => {
      // Wait 2 seconds for the scrollbar to be gone
      browser.pause(2000);

      expect(browser.compareScreen('Login-01-default').misMatchPercentage).toEqual(0);
    });

    it('should able to compare a screenshot of the error login screen', () => {
      LoginScreen.signIn({ username: 1, password: 1 });
      LoginScreen.errorMessage.waitForDisplayed(DEFAULT_TIMEOUT);

      expect(browser.compareScreen('Login-02-error').misMatchPercentage).toEqual(0);
    });
  });

  describe('After Login', () => {
    beforeEach(() => {
      LoginScreen.signIn(LOGIN_USERS.STANDARD);
      InventoryListScreen.waitForIsShown();
    });

    describe('Swag items screen', () => {
      it('should able to compare a screenshot of the swag list grid screen', () => {
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('SwagList-grid-01').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the swag list grid screen with 1 product', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');
        expect(browser.compareScreen('SwagList-grid-02-add-product').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the swag modal', () => {
        ModalSelect.openSortingModal();

        expect(browser.compareScreen('SwagList-grid-03-modal').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the swag details', () => {
        const swagItemLabel = 'Sauce Labs Backpack';

        InventoryListScreen.openSwagItemDetails(swagItemLabel);
        InventoryItemScreen.waitForIsShown();

        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(InventoryItemScreen.getSwagDescription()).toContain(swagItemLabel, 'The content of the selected swag item was not correct');
        expect(browser.compareScreen('SwagList-grid-04-swag-detail').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the swag list row screen', () => {
        expect(InventoryListScreen.isRowLayout()).toEqual(false, 'The layout is already a row layout');
        InventoryListScreen.toggleLayout();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('SwagList-row-01').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the swag list row screen with 1 product', () => {
        expect(InventoryListScreen.isRowLayout()).toEqual(false, 'The layout is already a row layout');
        InventoryListScreen.toggleLayout();
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');
        expect(browser.compareScreen('SwagList-row-02-add-product').misMatchPercentage).toEqual(0);
      });
    });

    describe('Swag cart screen', () => {
      it('should able to compare a screenshot of the cart screen', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

        AppHeader.openCart();
        CartContent.waitForIsShown();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('Cart-01').misMatchPercentage).toEqual(0);
      });
    });

    describe('Checkout - information', () => {
      it('should able to compare a screenshot of the checkout information screen', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

        AppHeader.openCart();
        CartContent.waitForIsShown();
        CartContent.goToCheckout();
        CheckoutPageOne.waitForIsShown();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('Checkout-information-01-default').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the checkout information error screen', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

        AppHeader.openCart();
        CartContent.waitForIsShown();
        CartContent.goToCheckout();
        CheckoutPageOne.waitForIsShown();
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.NO_FIRSTNAME);
        CheckoutPageOne.waitForIsShown(CheckoutPageOne.errorMessage);

        expect(browser.compareScreen('Checkout-information-02-error').misMatchPercentage).toEqual(0);
      });
    });

    describe('Checkout - overview', () => {
      it('should able to compare a screenshot of the checkout overview screen', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

        AppHeader.openCart();
        CartContent.waitForIsShown();
        CartContent.goToCheckout();
        CheckoutPageOne.waitForIsShown();
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
        CheckoutPageTwo.waitForIsShown();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('Checkout-overview-01-default').misMatchPercentage).toEqual(0);
      });
    });

    describe('Finish', () => {
      it('should able to compare a screenshot of the finish screen', () => {
        InventoryListScreen.addSwagItemToCart('Sauce Labs Backpack');

        expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

        AppHeader.openCart();
        CartContent.waitForIsShown();
        CartContent.goToCheckout();
        CheckoutPageOne.waitForIsShown();
        CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
        CheckoutPageTwo.waitForIsShown();
        CheckoutPageTwo.finishCheckout();
        CheckoutComplete.waitForIsShown();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('Finish-01-default').misMatchPercentage).toEqual(0);
      });
    });

    describe('Menu', () => {
      it('should able to compare a screenshot of the menu screen', () => {
        expect(Menu.isOpen()).toEqual(false, 'The menu should not be opened.');

        Menu.open();

        expect(Menu.isOpen()).toEqual(true, 'The menu should be opened.');
        expect(browser.compareScreen('Menu-01').misMatchPercentage).toEqual(0);
      });
    });

    describe('Webview', () => {
      it('should able to compare a screenshot of the Webview default screen', () => {
        Menu.open();
        Menu.openWebview();
        // Wait 2 seconds for the scrollbar to be gone
        browser.pause(2000);

        expect(browser.compareScreen('Webview-01-default').misMatchPercentage).toEqual(0);
      });

      it('should able to compare a screenshot of the Webview error screen', () => {
        Menu.open();
        Menu.openWebview();
        Webview.submitURL('http://www.saucelabs.com');
        Webview.waitForIsShown(Webview.errorMessage);

        expect(browser.compareScreen('Webview-02-error').misMatchPercentage).toEqual(0);
      });
    });
  });
});
