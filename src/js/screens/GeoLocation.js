import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';

export default class GeoLocation extends Component {
	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
	}

	render() {
		return (
			<ThemeProvider>
				<SecondaryHeader header={ I18n.t('geoLocation.header') } />
				<ScrollView
					style={ styles.container }
					{ ...testProperties(I18n.t('geoLocation.screen')) }
				>
					<View style={ [ styles.webview_container, styles.container_padding ] }>
						<Text>Geolocation</Text>
					</View>
					<Footer/>
				</ScrollView>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	container_padding: {
		paddingRight: 40,
		paddingLeft: 40,
	},
	webview_container: {
		alignItems: 'center',
		paddingTop: 120,
	},
});
