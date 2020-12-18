import { languageSelectors, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';
import InventoryItemScreen from '../../screenObjects/inventoryItem';
import AppHeader from '../../screenObjects/appHeader';
import { LOGIN_USERS } from '../../helpers/e2eConstants';
import Gestures from '../../helpers/Gestures';

describe('Swag Item Page', () => {
	const SELECTORS = languageSelectors();

	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
		LoginScreen.signIn(LOGIN_USERS.STANDARD);
		InventoryListScreen.waitForIsShown();
	});

	it('should show the details of the selected swag', () => {
		const swagItemLabel = SELECTORS.products.backpack.name;

		InventoryListScreen.openSwagItemDetails(swagItemLabel);
		InventoryItemScreen.waitForIsShown();

		expect(InventoryItemScreen.getSwagDescription()).toContain(swagItemLabel, 'The content of the selected swag item was not correct');
	});

	it('should be able to add a swag item to the cart from the details page', () => {
		InventoryListScreen.openSwagItemDetails(SELECTORS.products.backpack.name);
		InventoryItemScreen.waitForIsShown();

		expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');

		InventoryItemScreen.addSwagItemToCart();

		expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');
	});

	it('should be able to remove a swag item from the cart from the details page added in the swag overview page', () => {
		InventoryListScreen.addSwagItemToCart(SELECTORS.products.backpack.name);
		// Scroll a bit up so the item could be click correct
		Gestures.swipeDown(0.60);
		InventoryListScreen.openSwagItemDetails(SELECTORS.products.backpack.name);
		InventoryItemScreen.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

		InventoryItemScreen.removeSwagItemFromCart();

		expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
	});

	it('should be able to remove a swag item from the cart from the details page', () => {
		InventoryListScreen.openSwagItemDetails(SELECTORS.products.backpack.name);
		InventoryItemScreen.waitForIsShown();

		InventoryItemScreen.addSwagItemToCart();

		expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

		InventoryItemScreen.removeSwagItemFromCart();

		expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
	});

	it('should be able to get back to the swag overview page from the swag details page through the back button', () => {
		InventoryListScreen.openSwagItemDetails(SELECTORS.products.backpack.name);
		InventoryItemScreen.waitForIsShown();

		InventoryItemScreen.goBackToAllSwagItems();
		InventoryListScreen.waitForIsShown();

		expect(InventoryItemScreen.isShown()).toEqual(false, 'The swag items details page should not be visible');
	});

	it('should be able to zoom into the image of the selected swag item on the details page', () => {
		const swagItemLabel = SELECTORS.products.backpack.name;

		InventoryListScreen.openSwagItemDetails(swagItemLabel);
		InventoryItemScreen.waitForIsShown();

		Gestures.pinchAndZoom(InventoryItemScreen.imageContainer, 'zoom');

		// For demo purpose, we can't verify properly if the zoom / pinch worked
		driver.pause(5000);
	});
});
