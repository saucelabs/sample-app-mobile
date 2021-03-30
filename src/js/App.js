/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationContainer from './Router';
import SwagLabsStatusBar from './components/StatusBar';
import SplashScreen from 'react-native-splash-screen';
import QuickActions from 'react-native-quick-actions';
import { IS_IOS, SCREENS } from './config/Constants';
import TestFairy from 'react-native-testfairy';

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
		// We call stop to support hot-swap during development. This call will be ignored silently for the initial app launch.
		TestFairy.stop();

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
		// TestFairy.setServerEndpoint("https://your.privatecloud.example.com") // Private cloud only
		TestFairy.begin('SDK-gLeZiE9i');
		// TestFairy.installFeedbackHandler('SDK-gLeZiE9i'); // Swap this line with the above if you don't want to record a session but still need the shake gesture detection for the feedbacks.

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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
