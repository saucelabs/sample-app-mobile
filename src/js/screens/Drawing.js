import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import SignatureScreen from 'react-native-signature-canvas';
import { ThemeProvider } from 'react-native-elements';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { IS_IOS, MUSEO_SANS_BOLD, PLATFORM_VERSION } from '../config/Constants';

class Drawing extends Component {
	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<ThemeProvider>
				<SecondaryHeader header={ I18n.t('drawing.header') }/>
				<SignatureScreen
					// handle when you click save button
					onOK={(img) => console.log(img)}
					onEmpty={() => console.log("empty")}
					// clear button text
					clearText="Clear"
					// save button text
					confirmText="Save"
					// String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
					webStyle={`.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`
					}
					autoClear={true}
					imageType={"image/svg+xml"}
				/>
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
	text_container: {
		alignItems: 'center',
		paddingBottom: 100,
		paddingTop: 120,
	},
	label: {
		color: colors.slRed,
		fontSize: 18,
		fontFamily: MUSEO_SANS_BOLD,
	},
	link: {
		color: colors.slRed,
	},
	marginTop: {
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		color: colors.gray,
		textAlign: 'center',
	},
	italic: {
		fontStyle: 'italic',
	},
});

export default withNavigationFocus(Drawing);
