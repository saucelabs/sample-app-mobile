const { argv } = require('yargs');
const { config } = require('./wdio.appium.local.shared');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
	{
		// The defaults you need to have in your config
		deviceName: 'iPhone 11',
		platformName: 'iOS',
		platformVersion: '14.2',
		orientation: 'PORTRAIT',
		// The path to the app, this can be found in the 'XCODE DerivedData'-folder which can look like this
		// `/Users/{username}/Library/Developer/Xcode/DerivedData/SwagLabsMobileApp-{string}/Build/Products/Debug-iphonesimulator/SwagLabsMobileApp.app`
		app: '/Users/wimselles/Library/Developer/Xcode/DerivedData/SwagLabsMobileApp-hcxuhtnhlnfvtbfrbzdjhftgjxiq/Build/Products/Debug-iphonesimulator/SwagLabsMobileApp.app',
		// Read the reset strategies very well, they differ per platform, see
		// http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
		noReset: true,
		autoAcceptAlerts: true,
		newCommandTimeout: 240,
		maxInstances: 1,
		language: argv.language || 'en',
	},
];

exports.config = config;
