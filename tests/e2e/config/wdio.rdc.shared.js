const { config } = require('./wdio.shared.conf');
const SauceLabs = require('../helpers/SauceLabs');

// =========================
// Sauce RDC specific config
// =========================
config.protocol = 'https';
// For using the EU RDC cloud, just remove the comments and comment the US url
config.hostname = 'eu1.appium.testobject.com';
// For using the US RDC cloud
// config.hostname = 'us1.appium.testobject.com';
config.port = 443;
config.path = '/wd/hub';
config.services = [];

// =============================================
// Max instances of the same device in the cloud
// =============================================
config.maxInstances = 10;

// ==============================================
// Update the testjob in the cloud after finished
// ==============================================
config.after = (result) => {
  new SauceLabs().updateJobStatus(driver.sessionId, result === 0);
};

exports.config = config;
