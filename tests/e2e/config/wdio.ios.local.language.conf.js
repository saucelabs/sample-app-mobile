const { argv } = require('yargs');
const { config } = require('./wdio.ios.local.conf');

// ============
// Capabilities
// ============
config.capabilities[ 0 ].language = argv.language || 'nl';

exports.config = config;
