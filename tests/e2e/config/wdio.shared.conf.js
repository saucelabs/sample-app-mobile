exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  // ==================
  // Specify Test Files
  // ==================
  specs: [
    './tests/e2e/spec/**/*.spec.js',
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
  services: [ 'appium' ],
  framework: 'jasmine',
  reporters: [ 'spec' ],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function (passed, assertion) {
    },
  },
  // ====================
  // Appium Configuration
  // ====================
  // Default port for Appium
  port: 4723,
  maxInstances: 1,
  // =====
  // Hooks
  // =====
  beforeSession: (config, capabilities, specs) => {
    require('@babel/register');
  },
};
