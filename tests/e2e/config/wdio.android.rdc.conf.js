const { argv } = require('yargs');
const { config } = require('./wdio.sauce.shared');

// =============
// Exclude specs
// =============
config.exclude = [
  // Touch/FaceID doesn't work on RDC for Android yet
  './tests/e2e/spec/extra/touch.face.id.spec.js',
  // The app needs to be on the home screen and that doesn't work equal
  // for all different Android devices / OS versions
  './tests/e2e/spec/extra/force.touch.spec.js',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    deviceName: 'Samsung Galaxy S([0-9]).*',
    automationName: 'UiAutomator2',
    app: 'storage:filename=sample-app-android.apk',
    appWaitActivity: 'com.swaglabsmobileapp.MainActivity',
    platformName: 'Android',
    idleTimeout: 180,
    cacheId: new Date().getTime(),
    noReset: true,
    autoGrantPermissions: true,
    orientation: 'PORTRAIT',
    newCommandTimeout: 180,
    language: argv.language || 'en',
    locale: argv.language || 'en',
    build: 'sample-app-mobile',
    name: 'Sample App Test Name',
    maxInstances: 10,
  },
];

exports.config = config;
