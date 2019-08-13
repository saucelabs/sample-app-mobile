import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Biometrics from 'react-native-biometrics';
import { testProperties } from '../config/TestProperties';
import { Button } from 'react-native-elements';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../config/I18n';

Icon.loadFont();

export default class BiometryButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onPress, type } = this.props;
		const iconName = I18n.t(type === Biometrics.TouchID ? 'login.fingerprint' : 'login.faceRecognition');

		return (
			<Button
				buttonStyle={ styles.button_style }
				containerStyle={ styles.button_container_style }
				onPress={ onPress }
				{ ...testProperties(I18n.t('login.biometry'), true) }
				icon={
					<Icon
						style={ styles.icon }
						name={ iconName }
						{ ...testProperties(iconName) }
					/>
				}
			/>
		);
	}
}

const styles = StyleSheet.create({
	button_container_style: {
		width: '100%',
		marginBottom: 2,
		marginTop: 2,
	},
	button_style: {
		backgroundColor: colors.white,
		borderColor: colors.slRed,
		borderWidth: 3,
		borderRadius: 0,
		paddingBottom: 10,
		paddingTop: 10,
		elevation: 0,
	},
	icon: {
		color: colors.slRed,
		fontSize: 20,
	},
});
