const { config } = require('./wdio.shared.conf');

// =========================
// Sauce RDC specific config
// =========================
// Determination of the the US or EU RDC cloud url will be done
// automatically with the webdriverio service, just tell WebdriverIO
// to or connect to the 'us', or the 'eu' region
config.services = ['sauce'];
config.region = 'eu'; // For us cloud, change this to 'us'

// =============================================
// Max instances of the same device in the cloud
// =============================================
config.maxInstances = 10;

exports.config = config;
