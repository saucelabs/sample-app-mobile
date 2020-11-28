const { join } = require('path');
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
		automationName: 'UiAutomator2',
		deviceName: 'Pixel_3_10.0',
		platformName: 'Android',
		platformVersion: '10.0',
		orientation: 'PORTRAIT',
		app: join(process.cwd(), './apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
		appWaitActivity: 'com.swaglabsmobileapp.MainActivity',
		// Read the reset strategies very well, they differ per platform, see
		// http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
		noReset: true,
		autoGrantPermissions: true,
		newCommandTimeout: 240,
		maxInstances: 1,
		language: argv.language || 'en',
		locale: argv.language || 'en',
	},
];

exports.config = config;
