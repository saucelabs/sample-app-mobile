import SELECTORS from '../../../src/js/config/translations/en';
import Base from './base';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';
import { sanitizeSelector } from '../helpers/utils';

const SCREEN_SELECTOR = `~test-${ sanitizeSelector(SELECTORS.menu.allItems) }`;

class Menu extends Base {
	constructor() {
		// The `all items` is used for that because there is no other way to determine that
		// the menu container
		super(SCREEN_SELECTOR);
	}

	get button() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.label) }`);
	}

	get closeButton() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.close) }`);
	}

	get allItems() {
		return $(SCREEN_SELECTOR);
	}

	get webview() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.webview) }`);
	}

	get about() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.about) }`);
	}

	get logout() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.logout) }`);
	}

	get resetAppState() {
		return $(`~test-${ sanitizeSelector(SELECTORS.menu.reset) }`);
	}

	/**
	 * Open the menu
	 *
	 * @return {void}
	 */
	open() {
		// Open the menu
		this.button.click();

		return this.waitUntilOpened();
	}

	/**
	 * Check if the menu is open
	 *
	 * @return {boolean}
	 */
	isOpen() {
		return this.isShown();
	}

	/**
	 * Wait until the menu is closed
	 *
	 * @return {void}
	 */
	waitUntilClosed() {
		return driver.waitUntil(() => {
			// Wait 500 ms for the animation and then check the state
			driver.pause(500);
			return !this.isShown(this.closeButton);
		}, DEFAULT_TIMEOUT);
	}

	/**
	 * Wait until the menu is opened
	 *
	 * @return {void}
	 */
	waitUntilOpened() {
		return driver.waitUntil(() => this.isShown(), DEFAULT_TIMEOUT);
	}

	/**
	 * Close the menu
	 *
	 * @return {void}
	 */
	close() {
		this._menuClick(this.closeButton);

		return this.waitUntilClosed();
	}

	/**
	 * Click on the all items menu item
	 *
	 * @return {void}
	 */
	openAllItems() {
		this._menuClick(this.allItems);

		return this.waitUntilClosed();
	}

	/**
	 * Click on the webview menu item
	 *
	 * @return {void}
	 */
	openWebview() {
		this._menuClick(this.webview);

		return this.waitUntilClosed();
	}

	/**
	 * Click on the about menu item
	 *
	 * @return {void}
	 */
	openAbout() {
		return this._menuClick(this.about);
	}

	/**
	 * Click on the logout menu item
	 *
	 * @return {void}
	 */
	clickOnLogout() {
		this._menuClick(this.logout);

		return this.waitUntilClosed();
	}

	/**
	 * Click on the reset menu item
	 *
	 * @return {void}
	 */
	clickOnReset() {
		this._menuClick(this.resetAppState);

		return this.waitUntilClosed();
	}

	/**
	 * A custom implementation of the menu click because iOS needs a custom implementation
	 *
	 * @param {Element} element
	 *
	 * @return {void}
	 *
	 * @private
	 */
	_menuClick(element) {
		if (driver.isIOS) {
			return driver.execute('mobile: tap',
				{
					element: element.elementId,
					x: 10,
					y: 10,
				},
			);
		}

		return element.click();
	}

}

export default new Menu();
