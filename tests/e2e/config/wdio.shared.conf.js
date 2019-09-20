exports.config = {
	// ====================
	// Runner Configuration
	// ====================
	runner: 'local',
	// ==================
	// Specify Test Files
	// ==================
	specs: [
		'./tests/e2e/spec/default/*.spec.js',
	],
	// ===================
	// Test Configurations
	// ===================
	logLevel: 'silent',
	deprecationWarnings: true,
	bail: 0,
	baseUrl: 'http://localhost',
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	framework: 'jasmine',
	reporters: [ 'spec' ],
	jasmineNodeOpts: {
		defaultTimeoutInterval: 120000,
	},
	services: [ 'native-app-compare' ],
	// The options
	nativeAppCompare: {
		baselineFolder: 'tests/e2e/image-baseline',
		screenshotPath: '.tmp/image-compare',
		imageNameFormat: '{tag}-{deviceName}-{platformName}-{platformVersion}',
		autoSaveBaseline: true,
		blockOutStatusBar: true,
		blockOutIphoneXBottomBar: true,
		blockOutNavigationBar: true,
		savePerDevice: true,
	},
	// =====
	// Hooks
	// =====
	beforeSession: (config, capabilities, specs) => {
		// Use Babel to compile the code before running all tests
		require('@babel/register');
	},
	before: () => {
		/**
		 * Custom property that is used to determine if the app is already launched for the first time
		 * This property is needed because the first time the app is automatically started, so a double
		 * restart is not needed.
		 */
		driver.firstAppStart = true;

		/**
		 * Custom property that is used to determine if biometric access is already allowed.
		 */
		driver.isBioMetricAllowed = false;

		/**
		 * Custom property that will get the language specific selectors based on the used capabilities
		 */
		driver.selectors = (() => {
			let selectors;
			const DEFAULT_LANGUAGE = 'en';
			const language = driver.config.language || DEFAULT_LANGUAGE;
			const path = '../../../src/js/config/translations';

			try {
				selectors = require(`${ path }/${ language }`);
			} catch (e) {
				console.log('\n################################################\n');
				console.log(`The language code '${ language }' does not exist`);
				console.log(`It will be defaulted to '${ DEFAULT_LANGUAGE }'`);
				console.log('\n################################################\n');
				selectors = require(`${ path }/${ DEFAULT_LANGUAGE }`);
			}

			return selectors.default;
		})();
	},
};
