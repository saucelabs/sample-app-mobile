/**
 * The app is opened by Appium by default, when we start a new test
 * the app needs to be reset
 */
export function restartApp(){
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
      visualText = element.$$('*//android.widget.TextView').reduce((currentValue, el) => `${currentValue} ${el.getText()}`, '');
    } else {
      const iosElement = isXpath ? element.$$('*//XCUIElementTypeStaticText') : element;
      if (isXpath){
        visualText = element.$$('*//XCUIElementTypeStaticText').reduce((currentValue, el) => `${currentValue} ${el.getText()}`, '');
      } else {
        visualText = iosElement.getText();
      }
    }
  } catch (e) {
    visualText = element.getText();
  }

  return visualText.trim();
}
