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
		'./tests/e2e/spec/extra/*.spec.js',
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
		helpers: [ require.resolve('@babel/register') ],
	},
	services: [],
	// =====
	// Hooks
	// =====
	onPrepare: (config) => {
		/**
		 * Set the language on the config which will be used for setting the selectors
		 */
		config.language = config.language || 'en';
	},
	before: () => {
		/**
		 * Custom property that is used to determine if the app is already launched for the first time
		 * This property is needed because the first time the app is automatically started, so a double
		 * restart is not needed.
		 */
		driver.firstAppStart = true;
	},
};
