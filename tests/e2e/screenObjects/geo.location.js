import Base from './base';

class GeoLocation extends Base {
	constructor() {
		super(`~test-${ driver.selectors.geoLocation.screen }`);
	}

	get SELECTORS() {
		return driver.selectors;
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
	setLocation({longitude, latitude}){
		driver.setGeoLocation({longitude, latitude});
	}

	/**
	 * Wait until the position is shown
	 */
	waitUntilPositionShown(){
		driver.waitUntil(()=>{
			const latitude = this.latitudeValue.getText();
			const longitude = this.longitudeValue.getText();
			const positionText = this.SELECTORS.geoLocation.position;

			return latitude !== positionText && longitude !== positionText;
		}, 60000);
	}

	/**
	 * Get the the latitude value
	 *
	 * @returns {number}
	 */
	getLatitudeValue(){
		return Number(this.latitudeValue.getText());
	}

	/**
	 * Get the the longitude value
	 *
	 * @returns {number}
	 */
	getLongitudeValue(){
		return Number(this.longitudeValue.getText());
	}
}

export default new GeoLocation();
