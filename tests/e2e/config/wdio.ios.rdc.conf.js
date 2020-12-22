const { argv } = require('yargs');
const { config } = require('./wdio.sauce.shared');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    deviceName: 'iPhone ([12]|[7-8]|X.*).*',
    platformName: 'iOS',
    app: 'storage:filename=sample-app-ios.ipa',
    idleTimeout: 180,
    cacheId: new Date().getTime(),
    autoAcceptAlerts: true,
    noReset: true,
    orientation: 'PORTRAIT',
    newCommandTimeout: 180,
    language: argv.language || 'en',
    build: 'sample-app-mobile',
    name: 'Sample App Test Name',
    maxInstances: 10,
  },
];

exports.config = config;
