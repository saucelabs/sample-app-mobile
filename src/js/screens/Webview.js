import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeProvider } from 'react-native-elements';
import { WINDOW_WIDTH } from '../config/Constants';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';

export default class WebViewScreen extends Component {
	renderLoading() {
		return (
			<View
				style={ styles.loaderContainer }
			>
				<Image
					source={ require('../../img/surfing-sauce.jpg') }
					style={ styles.image }
					resizeMode="contain"
				/>
			</View>
		);
	}

	render() {
		return (
			<ThemeProvider>
				<SecondaryHeader/>
				<WebView
					renderLoading={ this.renderLoading }
					source={ { uri: this.props.navigation.state.params.url } }
					startInLoadingState
				/>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	loaderContainer: {
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		...StyleSheet.absoluteFill,
	},
	image: {
		margin: 40,
		// This is for keeping the aspect ratio and make it responsive
		height: (WINDOW_WIDTH - 80) * 0.857,
		width: WINDOW_WIDTH - 80,
	},
});
