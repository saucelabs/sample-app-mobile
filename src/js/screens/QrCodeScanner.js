import React, { Component } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { ThemeProvider } from 'react-native-elements';
import I18n from '../config/I18n';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import { testProperties } from '../config/TestProperties';

export default class QrCodeScanner extends Component {
	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
	}

	onSuccess = (e) => {
		Linking
			.openURL(e.data)
			.catch(err => alert('An error occurred', err));
	};

	render() {
		return (
			<ThemeProvider>
				<SecondaryHeader/>
				<QRCodeScanner
					onRead={ this.onSuccess }
					showMarker
					reactivate
					markerStyle={ styles.slMarker }
					topViewStyle={ styles.contentContainer }
					topContent={
						<View
							style={ styles.bottomTextContainer }
							{ ...testProperties(I18n.t('qrCodeScanner.screen')) }
						>
							<Text style={ styles.bottomText }>{ I18n.t('qrCodeScanner.lineOne') }</Text>
							<Text style={ styles.bottomText }>{ I18n.t('qrCodeScanner.lineTwo') }</Text>
						</View>
					}
					bottomViewStyle={ styles.contentContainer }
					bottomContent={
						<View style={ styles.bottomTextContainer }/>
					}
				/>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	textBold: {
		fontWeight: '500',
		color: '#000',
	},
	contentContainer: {
		backgroundColor: colors.white,
		zIndex: 100,
		padding: 0,
		margin: 0,
	},
	bottomTextContainer: {
		padding: 10,
	},
	bottomText: {
		fontSize: 16,
		color: colors.gray,
		textAlign: 'center',
	},
	slMarker: {
		borderColor: colors.slRed,
	},
});
