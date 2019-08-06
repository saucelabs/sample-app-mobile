const { config } = require('./wdio.rdc.shared');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    deviceName: 'Google_Pixel_3_real',
    automationName: 'UiAutomator2',
    // The api key that has a reference to the app-project in the TO cloud
    testobject_api_key: process.env.SAUCE_RDC_EU_ACCESS_KEY_ANDROID,
    // The name of the test for in the cloud
    testobject_test_name: 'sample-app-mobile',
    // Some default settings
    // You can find more info in the TO Appium Basic Setup section
    appWaitActivity: 'com.swaglabsmobileapp.MainActivity',
    platformName: 'Android',
    idleTimeout: 180,
    testobject_cache_device: true,
    noReset: true,
    orientation: 'PORTRAIT',
    newCommandTimeout: 180,
  },
];

exports.config = config;
