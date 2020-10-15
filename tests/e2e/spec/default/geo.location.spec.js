import { openDeepLinkUrl, restartApp } from '../../helpers/utils';
import GeoLocation from '../../screenObjects/geo.location';

describe('Geo Location Page', () => {
	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		openDeepLinkUrl('geo-location');
		GeoLocation.waitForIsShown();
	});

	it('should be able to set and validate the geo location with Appium', () => {
		// Appium for Android (v1.19.0 and lower) is cutting the data to 5 chars
		// see https://github.com/appium/io.appium.settings/blob/master/app/src/main/java/io/appium/settings/receivers/LocationInfoReceiver.java#L48
		// const longitude = 52.5003197;
		// const latitude = 13.4514209;
		const longitude = 52.50032;
		const latitude = 13.45143;
		GeoLocation.setLocation({ longitude, latitude });

		// Give the GPS some time to process the new data
		driver.pause(1000);

		// Wait until the position is shown
		GeoLocation.waitUntilPositionStable();

		expect(GeoLocation.getLongitudeValue()).toBe(longitude, 'Incorrect longitude');
		expect(GeoLocation.getLatitudeValue()).toBe(latitude, 'Incorrect latitude');
	});
});
