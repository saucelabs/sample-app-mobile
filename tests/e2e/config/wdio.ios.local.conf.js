const { join } = require('path');
const config = require('./wdio.shared.conf').config;

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    deviceName: 'iPhone X',
    platformName: 'iOS',
    platformVersion: '12.1',
    orientation: 'PORTRAIT',
    // The path to the app
    app: join(process.cwd(), './ios/build/Build/Products/Debug-iphonesimulator/SwagLabsMobileApp.app'),
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    noReset: true,
    newCommandTimeout: 240,
    maxInstances: 1,
  },
];

// ======
// Appium
// ======
// Tell Appium which port to use
config.port = 4723;

exports.config = config;
