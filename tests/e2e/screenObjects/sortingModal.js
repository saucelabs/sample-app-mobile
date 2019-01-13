import * as SELECTORS from '../../../src/js/config/translations/en.json';
import { DEFAULT_TIMEOUT } from '../helpers/e2eConstants';

class SortingModal {
  get modal() {
    // Can only get the modal based on the second option
    return $(`~${ SELECTORS.modalSelector.container }`);
  }

  get sortingButton() {
    return $(`~test-${ SELECTORS.modalSelector.button }`);
  }

  get a2z() {
    const selector = driver.isIOS ? `~${ SELECTORS.modalSelector.azLabel }` : `//*[@content-desc="${ SELECTORS.modalSelector.container }"]/*/android.view.ViewGroup[2]`;

    return $(selector);
  }

  get z2a() {
    const selector = driver.isIOS ? `~${ SELECTORS.modalSelector.zaLabel }` : `//*[@content-desc="${ SELECTORS.modalSelector.container }"]/*/android.view.ViewGroup[3]`;

    return $(selector);
  }

  get lowHigh() {
    const selector = driver.isIOS ? `~${ SELECTORS.modalSelector.loHiLabel }` : `//*[@content-desc="${ SELECTORS.modalSelector.container }"]/*/android.view.ViewGroup[4]`;

    return $(selector);
  }

  get hiLow() {
    const selector = driver.isIOS ? `~${ SELECTORS.modalSelector.hiLoLabel }` : `//*[@content-desc="${ SELECTORS.modalSelector.container }"]/*/android.view.ViewGroup[5]`;

    return $(selector);
  }

  get cancel() {
    const selector = driver.isIOS ? `~${ SELECTORS.modalSelector.cancel }` : `//*[@content-desc="${ SELECTORS.modalSelector.container }"]/../../*[2]`;

    return $(selector);
  }

  /**
   * Open the sorting modal
   *
   * @return {boolean}
   */
  openSortingModal() {
    this.sortingButton.click();
    return this.waitForSortingModalIsDisplayed();
  }

  /**
   * Wait for the modal screen to be displayed
   *
   * @return {boolean}
   */
  waitForSortingModalIsDisplayed() {
    return this.modal.waitForDisplayed(DEFAULT_TIMEOUT);
  }

  /**
   * The sorting modal is not displayed.
   * iOS still has it in it's UI tree, Android doesnt have it anymore
   *
   * @return {boolean}
   */
  sortingModalNotDisplayed() {
    if (driver.isIOS) {
      return this.modal.isDisplayed();
    }

    return this.modal.isExisting();
  }
}

export default new SortingModal();
