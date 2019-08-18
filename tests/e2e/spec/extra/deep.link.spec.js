import { openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';
import AppHeader from '../../screenObjects/appHeader';
import InventoryItemScreen from '../../screenObjects/inventoryItem';
import CartContent from '../../screenObjects/cart';
import CheckoutPageOne from '../../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../../screenObjects/checkoutPageTwo';
import CheckoutComplete from '../../screenObjects/checkoutComplete';
import Webview from '../../screenObjects/webview';

describe('Deep linking', () => {
	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
	});

	it('should be able to open the Swag overview screen', () => {
		openDeepLinkUrl('swag-overview/0,1,2');
		InventoryListScreen.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(3, 'Cart amount is not correct');
	});

	it('should be able to open the Swag details screen', () => {
		openDeepLinkUrl('swag-item/1');

		expect(InventoryItemScreen.waitForIsShown()).toEqual(true, 'Item screen is not shown');
	});

	it('should be able to open the Cart screen', () => {
		openDeepLinkUrl('cart/0,1,2');
		CartContent.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(3, 'Cart amount is not correct');
	});

	it('should be able to open the Personal info screen', () => {
		openDeepLinkUrl('personal-info/0,1,2');
		CheckoutPageOne.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(3, 'Cart amount is not correct');
	});

	it('should be able to open the Checkout overview screen', () => {
		openDeepLinkUrl('checkout-overview/0,1,2');
		CheckoutPageTwo.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(3, 'Cart amount is not correct');
	});

	it('should be able to open the complete screen', () => {
		openDeepLinkUrl('complete');

		expect(CheckoutComplete.waitForIsShown()).toEqual(true, 'The Checkout is not shown');
	});

	it('should be able to open the Webview screen', () => {
		openDeepLinkUrl('webview');

		expect(Webview.waitForIsShown()).toEqual(true, 'The Webview is not shown');
	});
});
