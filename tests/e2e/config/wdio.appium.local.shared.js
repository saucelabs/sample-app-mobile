const { config } = require('./wdio.shared.conf');

// ======
// Appium
// ======
config.services = config.services.concat([ [
	'appium',
	{
		command: 'appium',
	},
] ]);

// Tell Appium which port to use
config.port = 4723;

exports.config = config;
