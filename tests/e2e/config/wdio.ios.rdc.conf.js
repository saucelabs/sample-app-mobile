const { argv } = require('yargs');
const { config } = require('./wdio.rdc.shared');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    deviceName: 'iPhone XS*',
    // The api key that has a reference to the app-project in the TO cloud
    testobject_api_key: process.env.SAUCE_RDC_EU_ACCESS_KEY_IOS,
    // The name of the test for in the cloud
    testobject_test_name: 'sample-app-mobile',
    // Some default settings
    // You can find more info in the TO Appium Basic Setup section
    platformName: 'iOS',
    idleTimeout: 180,
    testobject_cache_device: true,
    noReset: true,
    orientation: 'PORTRAIT',
    newCommandTimeout: 180,
    language: argv.language || 'en',
    appiumVersion: '1.17.0',
    sauceLabsImageInjectionEnabled: argv.imageInjection || false,
    autoAcceptAlerts:true,
  },
];

exports.config = config;
