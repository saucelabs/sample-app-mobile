const { argv } = require('yargs');
const { config } = require('./wdio.sauce.shared');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
	{
		// The defaults you need to have in your config
		deviceName: 'iPhone 11 Simulator',
		platformName: 'iOS',
		platformVersion: '13.4',
		orientation: 'PORTRAIT',
		app: 'storage:filename=sample-app-ios.zip',
		build: `iOS Sample App Simulator tests-${new Date().getTime()}`,
		// Read the reset strategies very well, they differ per platform, see
		// http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
		noReset: true,
		newCommandTimeout: 240,
		language: argv.language || 'en',
		maxInstances: 25,
	},
];
config.maxInstances = 25;

exports.config = config;
