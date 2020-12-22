import InventoryListScreen from '../../screenObjects/inventoryList';
import { DEFAULT_TIMEOUT } from '../../helpers/e2eConstants';

describe('Test 3D Touch', () => {
	it('should be able to open the 3D touch menu', () => {
		// Go to home
		driver.background(-1);

		if (driver.isIOS) {
			// Check Dock is shown
			$('~Dock').waitForDisplayed({ timeout: DEFAULT_TIMEOUT });

			// Open the 3D touch menu with a force touch
			driver.touchPerform([
				{
					action: 'press',
					options: {
						element: $('~SwagLabsMobileApp').elementId,
						pressure: 1,
					},
				},
				{
					action: 'wait',
					options: { ms: 2000 },
				},
				{
					action: 'release',
				},
			]);

			// Verify the 3D menu is opened
			expect($('~Open Swag Items, Open the Swag Items').waitForDisplayed({ timeout: DEFAULT_TIMEOUT }))
				.toEqual(true, '3D Touch menu did not open');

			$('~Open Swag Items, Open the Swag Items').click();
		} else {
			// Open the menu
			$('~Apps list').click();

			// Check if the app is there
			$('~Swag Labs Mobile App').waitForDisplayed({ timeout: DEFAULT_TIMEOUT });

			// Open the 3D touch menu with a force touch
			driver.touchPerform([
				{
					action: 'press',
					options: {
						element: $('~Swag Labs Mobile App').elementId,
					},
				},
				{
					action: 'wait',
					options: { ms: 2000 },
				},
				{
					action: 'release',
				},
			]);

			// Wait for the menu to open and click on it
			$('~Open Swag Items').waitForDisplayed({ timeout: DEFAULT_TIMEOUT });
			$('~Open Swag Items').click();
		}

		expect(InventoryListScreen.waitForIsShown()).toEqual(true, 'Inventory List screen was not shown');
	});
});
