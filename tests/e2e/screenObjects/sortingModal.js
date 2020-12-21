import Base from './base';
import { languageSelectors } from '../helpers/utils';

class SortingModal extends Base {
	constructor() {
		super(`~${ languageSelectors().modalSelector.container }`);
	}

	get SELECTORS(){
		return languageSelectors();
	}

	get screen() {
		// Can only get the modal based on the second option
		return $(`~${ this.SELECTORS.modalSelector.container }`);
	}

	get sortingButton() {
		return $(`~test-${ this.SELECTORS.modalSelector.button }`);
	}

	get cancel() {
		const cancelText = this.SELECTORS.modalSelector.cancel;
		const selector = driver.isIOS
			? `-ios predicate string:label == '${cancelText}' AND name == '${cancelText}' AND value == '${cancelText}'`
			: `//*[@content-desc="${ this.SELECTORS.modalSelector.container }"]/../../*[2]`;

		return $(selector);
	}

	/**
	 * Select an option
	 *
	 * @param {string} option
	 *
	 * @return {void}
	 */
	selectOption(option) {
		let selector;

		const modalSelectorContainer = this.SELECTORS.modalSelector.container;

		switch (option) {
			case this.SELECTORS.modalSelector.azLabel:
				selector = driver.isIOS ? `~${ this.SELECTORS.modalSelector.azLabel }` : `//*[@content-desc="${ modalSelectorContainer }"]/*/android.view.ViewGroup[2]`;
				break;
			case this.SELECTORS.modalSelector.zaLabel:
				selector = driver.isIOS ? `~${ this.SELECTORS.modalSelector.zaLabel }` : `//*[@content-desc="${ modalSelectorContainer }"]/*/android.view.ViewGroup[3]`;
				break;
			case this.SELECTORS.modalSelector.loHiLabel:
				selector = driver.isIOS ? `~${ this.SELECTORS.modalSelector.loHiLabel }` : `//*[@content-desc="${ modalSelectorContainer }"]/*/android.view.ViewGroup[4]`;
				break;
			case this.SELECTORS.modalSelector.hiLoLabel:
				selector = driver.isIOS ? `~${ this.SELECTORS.modalSelector.hiLoLabel }` : `//*[@content-desc="${ modalSelectorContainer }"]/*/android.view.ViewGroup[5]`;
				break;
			default:
				throw new Error(`The option '${ option }' is not valid`);
		}

		$(selector).click();
		// There is a sorting delay, this can only be done with a hard sleep :(
		return driver.pause(750);
	}

	/**
	 * Open the sorting modal
	 *
	 * @return {boolean}
	 */
	openSortingModal() {
		this.sortingButton.click();
		return this.waitForIsShown();
	}
}

export default new SortingModal();
