import { BUNDLE_IDS, DEFAULT_TIMEOUT } from './e2eConstants';

/**
 * The app is opened by Appium by default, when we start a new test
 * the app needs to be reset
 */
export function restartApp() {
  if (!driver.firstAppStart) {
    driver.reset();
  }
  // Set the firstAppstart to false to say that the following test can be reset
  driver.firstAppStart = false;
}


/**
 * Get the text of an element (including all child elements)
 *
 * @param {element} element
 * @param {boolean} isXpath
 *
 * @return {string}
 */
export function getTextOfElement(element, isXpath = false) {
  let visualText;

  try {
    if (driver.isAndroid) {
      visualText = element.$$('*//android.widget.TextView').reduce((currentValue, el) => `${ currentValue } ${ el.getText() }`, '');
    } else {
      const iosElement = isXpath ? element.$$('*//XCUIElementTypeStaticText') : element;
      if (isXpath) {
        visualText = element.$$('*//XCUIElementTypeStaticText').reduce((currentValue, el) => `${ currentValue } ${ el.getText() }`, '');
      } else {
        visualText = iosElement.getText();
      }
    }
  } catch (e) {
    visualText = element.getText();
  }

  return visualText.trim();
}

/**
 * Get the app state for iOS, see
 * http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-apps-management/
 *
 * @return {string}
 *
 * @example
 * <pre>
 *   // Possible outcomes
 *   // The current application state cannot be determined/is unknown
 *   // The application is not running
 *   // The application is running in the background and is suspended
 *   // The application is running in the background and is not suspended
 *   // The application is running in the foreground
 * </pre>
 */
function getIosAppState() {
  const appStates = {
    0: 'The current application state cannot be determined/is unknown',
    1: 'The application is not running',
    2: 'The application is running in the background and is suspended',
    3: 'The application is running in the background and is not suspended',
    4: 'The application is running in the foreground',
  };
  // Wait 2 second to be sure the app is done going to the background / get the correct status
  driver.pause(2000);

  const currentAppState = driver.execute('mobile: queryAppState', { bundleId: BUNDLE_IDS.IOS });

  return appStates[ currentAppState ];
}

/**
 * Get the current activity running on Android
 *
 * @return {string}
 */
function getCurrentActivity() {
  // Wait 2 second to be sure the app is done going to the background / get the correct status
  driver.pause(2000);

  return driver.getCurrentActivity();
}


/**
 * Open the webpage with a browser just once
 */
function openWebPageWithBrowserOnce() {
  const justOnceButton = '*//android.widget.Button[@resource-id="android:id/button_once"]';

  try {
    $('*//android.widget.ListView[@resource-id="android:id/resolver_list"]').waitForDisplayed(DEFAULT_TIMEOUT);

    if ($(justOnceButton).isEnabled()) {
      return $(justOnceButton).click();
    }

    // Chrome is most of the time the first
    $$('*//android.widget.ListView[@resource-id="android:id/resolver_list"]/android.widget.LinearLayout')[ 0 ].click();

    driver.pause(500);
    return $(justOnceButton).click();
  } catch (e) {
    // It could be that it already opens to the default browser and no check screen is asked
    return;
  }
}

/**
 * Verify that the browser is opened.
 * - iOS:     For iOS it not possible to check if the browser is opened, only if the app is
 *            put on the background
 * - Android: For Android we can check the current activity. If it holds a browser reference we know
 *            for sure that the app is put on the background and that for example chrome is opened.
 */
export function browserIsOpened() {
  if (driver.isIOS) {
    const appState = getIosAppState();

    return appState.includes('background') || appState.includes('not running');
  }
  // On Android we first need to select which browser we want to use
  openWebPageWithBrowserOnce();

  return getCurrentActivity().includes('chromium') || getCurrentActivity().includes('WebViewBrowserActivity');
}

/**
 * Hide the keyboard, but only if it is present
 *
 * @param {Element} element
 *
 * @return {void}
 */
export function hideKeyboard(element) {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!driver.isKeyboardShown()){
    return;
  }

  if (driver.isIOS) {
    return driver.touchAction({
      action: 'tap',
      x: 0,
      y: -40,
      element,
    });
  }

  try {
    return driver.hideKeyboard('pressKey', 'Done');
  } catch (e) {
    // Fallback
    return driver.back();
  }
}
