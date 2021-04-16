/**
 * @format
 * @flow strict-local
 */

import fs from 'react-native-fs';
import SplashScreen from 'react-native-splash-screen';
import QuickActions from 'react-native-quick-actions';
import TestFairy from 'react-native-testfairy';
 
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import NavigationContainer from './Router';
import SwagLabsStatusBar from './components/StatusBar';
import { IS_IOS, SCREENS } from './config/Constants';

QuickActions.setShortcutItems([
	{
		type: 'swagitems',
		title: 'Open Swag Items',
		subtitle: 'Open the Swag Items',
		// iOS provides a default set of icons, see
		// https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/system-icons/#home-screen-quick-action-icons
		// For Android we need to provide custom icons which need to be lowercase
		icon: IS_IOS ? 'Bookmark' : 'bookmark',
		userInfo: {
			url: SCREENS.INVENTORY_LIST,
		},
	},
	{
		type: 'webview',
		title: 'Open Webview',
		subtitle: 'Open the webview',
		icon: IS_IOS ? 'Home' : 'home',
		userInfo: {
			url: SCREENS.WEBVIEW_SELECTION,
		},
	},
]);

export default class App extends Component {
	componentDidMount() {
		this.initialzeTestFairy();

		// Hide splash screen once the component mounts
		SplashScreen.hide();
	}

	render() {
		return (
			<View style={ styles.container }>
				<SwagLabsStatusBar/>
				<NavigationContainer/>
			</View>
		);
	}

	initialzeTestFairy() {
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//
		// Launch a TestFairy session. The session url will be in the logs for you to navigate.
		// Optionally, specify a private cloud endpoint if it applies to you.
		//
		// When TestFairy launches a session, these will be listened collected until the session is stopped or app is closed:
		//
		//   - logs
		//   - crashes
		//   - video recording
		//   - http network events
		//   - feedbacks via forms launched when the users shakes their device
		//   - custom attributes set in the code w/ TestFairy.setAttribute()
		//   - events sent in the code w/ TestFairy.addEvent()
		//
		// and many others.
		//
		// All of this data will be available in your TestFairy web dashboard as well as the REST API.
		//
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		function parseAndInit(data) {
			// Parse configuration
			const TestFairyUserData = JSON.parse(data);

			// We call stop to support hot-swap during development. This call will be ignored silently for the initial app launch.
			TestFairy.stop();

			// TestFairy.setServerEndpoint("https://your.privatecloud.example.com") // Private cloud only

			TestFairy.setServerEndpoint(TestFairyUserData.serverEndpoint);
			TestFairy.begin(TestFairyUserData.appToken);

			// TestFairy.installFeedbackHandler(TestFairyUserData.appToken); // Swap this line with the above if you don't want to record a session but still need the shake gesture detection for the feedbacks.
		}

		if (Platform.OS === 'ios') {
			fs.readFile(`${fs.MainBundlePath}/user_data.json`, { encoding: 'utf8' }).then(parseAndInit);
		} else if (Platform.OS === 'android') {
			fs.readFileAssets('user_data.json', 'utf8').then(parseAndInit);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
