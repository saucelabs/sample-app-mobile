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
		deviceName: 'iPhone XS Simulator',
		platformName: 'iOS',
		platformVersion: '13.4',
		orientation: 'PORTRAIT',
		app: 'storage:filename=sample-app-ios.zip',
		build: 'iOS Sample App Simulator tests',
		// Read the reset strategies very well, they differ per platform, see
		// http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
		noReset: true,
		autoAcceptAlerts: true,
		newCommandTimeout: 240,
		language: argv.language || 'en',
	},
];

exports.config = config;
