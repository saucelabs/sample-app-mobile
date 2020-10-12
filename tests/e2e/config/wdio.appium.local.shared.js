const { config } = require('./wdio.shared.conf');

// ======
// Appium
// ======
config.services = config.services.concat([ [
	'appium',
	{
		command: 'appium',
		args: {
			// This will let us automatically download the needed ChromeDriver
			relaxedSecurity: true,
			// log: './appium.log',
		},
	},
] ]);

// Tell Appium which port to use
config.port = 4723;

exports.config = config;
