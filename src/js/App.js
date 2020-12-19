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
