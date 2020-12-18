import Base from './base';
import { languageSelectors } from '../helpers/utils';

class GeoLocation extends Base {
	constructor() {
		super(`~test-${ languageSelectors().geoLocation.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.geoLocation.screen }`);
	}

	get latitudeValue() {
		return $(`~test-${ this.SELECTORS.geoLocation.latitude }`);
	}

	get longitudeValue() {
		return $(`~test-${ this.SELECTORS.geoLocation.longitude }`);
	}

	/**
	 * Set the geo location
	 *
	 * @param {number} longitude
	 * @param {number} latitude
	 */
	setLocation({ longitude, latitude }) {
		driver.setGeoLocation({ longitude, latitude });
	}

	/**
	 * Wait until the position changed
	 *
	 * @param {number} longitude
	 * @param {number} latitude
	 */
	waitUntilPositionChanged(longitude, latitude) {
		driver.waitUntil(() => {
			const currentLongitude = this.getLongitudeValue();
			const currentLatitude = this.getLatitudeValue();

			return currentLongitude === longitude && currentLatitude === latitude;
		}, {
			// Android can take some time
			timeout: driver.isIOS ? 60000 : 120000,
			timeoutMsg: 'The position did not change in time!',
		});
	}

	/**
	 * Get the the latitude value
	 *
	 * @returns {number}
	 */
	getLatitudeValue() {
		return Number(this.latitudeValue.getText());
	}

	/**
	 * Get the the longitude value
	 *
	 * @returns {number}
	 */
	getLongitudeValue() {
		return Number(this.longitudeValue.getText());
	}
}

export default new GeoLocation();
