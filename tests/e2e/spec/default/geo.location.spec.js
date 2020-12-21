import { openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import GeoLocation from '../../screenObjects/geo.location';

describe('Geo Location Page', () => {
	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
		openDeepLinkUrl('geo-location');

		// It could be that the screen can't be detected due to an permission model
		// That's why we put it in a try catch
		try {
			GeoLocation.waitForIsShown();
		} catch (e){
			// Ignore
		}

		// Accept the permissions, if it's not there it will proceed after x amount of seconds
		GeoLocation.acceptPermissions();
	});

	it('should be able to set and validate the geo location with Appium', () => {
		// 1. Set the new location
		// Appium for Android (v1.19.0 and lower) is cutting the data to 5 chars
		// see
		// https://github.com/appium/io.appium.settings/blob/master/app/src/main/java/io/appium/settings/receivers/LocationInfoReceiver.java#L48
		// const longitude = 52.5003197;
		// const latitude = 13.4514209;
		const longitude = 52.50032;
		const latitude = 13.45143;
		GeoLocation.setLocation({ longitude, latitude });

		// Give the GPS some time to process the new data
		driver.pause(1000);

		// Wait until the position has changed
		GeoLocation.waitUntilPositionChanged(
			longitude,
			latitude,
		);

		expect(GeoLocation.getLongitudeValue()).toBe(longitude, 'Incorrect longitude');
		expect(GeoLocation.getLatitudeValue()).toBe(latitude, 'Incorrect latitude');
	});
});
