const { config } = require('./wdio.shared.conf');

// =====================
// Sauce specific config
// =====================
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
// Determination of the US or EU cloud url will be done
// automatically with the webdriverio service, just tell WebdriverIO
// to or connect to the 'us', or the 'eu' region
config.services = config.services.concat('sauce');
config.region = 'eu'; // For us cloud, change this to 'us'

// =============================================
// Max instances of the same device in the cloud
// =============================================
config.maxInstances = 20;

exports.config = config;
