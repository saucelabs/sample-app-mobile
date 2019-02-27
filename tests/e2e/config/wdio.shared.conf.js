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
  framework: 'jasmine',
  reporters: [ 'spec' ],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function (passed, assertion) {
    },
  },
  // =====
  // Hooks
  // =====
  beforeSession: (config, capabilities, specs) => {
    // Use Babel to compile the code before running all tests
    require('@babel/register');
  },
  before: ()=>{
    /**
     * Custom property that is used to determine if the app is already launched for the first time
     * This property is needed because the first time the app is automatically started, so a double
     * restart is not needed.
     */
    driver.firstAppStart = true;
  },
};
