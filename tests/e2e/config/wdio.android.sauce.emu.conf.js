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
		automationName: 'UiAutomator2',
		deviceName: 'Android GoogleAPI Emulator',
		platformName: 'Android',
		platformVersion: '10.0',
		orientation: 'PORTRAIT',
		app: 'storage:filename=sample-app-android.apk',
		appWaitActivity: 'com.swaglabsmobileapp.MainActivity',
		appiumVersion: '1.17.1',
		build: `Android Sample App Simulator tests-${new Date().getTime()}`,
		// Read the reset strategies very well, they differ per platform, see
		// http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
		noReset: true,
		autoGrantPermissions: true,
		newCommandTimeout: 240,
		language: argv.language || 'en',
		locale: argv.language || 'en',
		maxInstances: 25,
	},
];
config.maxInstances = 25;

exports.config = config;
