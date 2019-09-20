const { argv } = require('yargs');
const config = require('./wdio.android.local.conf').config;

// ============
// Capabilities
// ============
config.capabilities[ 0 ].language = argv.language || 'nl';
config.capabilities[ 0 ].locale = argv.language || 'nl';

exports.config = config;
