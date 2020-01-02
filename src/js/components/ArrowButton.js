import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { testProperties } from '../config/TestProperties';
import { Button } from 'react-native-elements';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';

export default class ArrowButton extends Component {
	render() {
		const { noBorders, onPress, title } = this.props;
		const borderStyle = noBorders ? styles.noBorders : styles.borders;

		return (
			<Button
				buttonStyle={ styles.button_style }
				containerStyle={ [styles.button_container, borderStyle] }
				titleStyle={ styles.button_title }
				onPress={ onPress }
				title={ title }
				icon={
					<Image
						style={ styles.button_image }
						source={ require('../../img/arrow-left.png') }
					/> }
				{ ...testProperties(title) }
			/>
		);
	}
}

const styles = StyleSheet.create({
	button_container: {
		borderRadius: 0,
		flex: 1,
	},
	borders: {
		borderWidth: 2,
		borderColor: colors.gray,
	},
	noBorders: {
		borderWidth: 0,
		borderColor: 'transparent',
	},
	button_style: {
		borderRadius: 0,
		backgroundColor: colors.white,
		paddingBottom: 10,
		paddingTop: 10,
		elevation: 0,
	},
	button_title: {
		color: colors.gray,
		fontFamily: MUSEO_SANS_BOLD,
		fontSize: 18,
	},
	button_image: {
		position: 'absolute',
		top: 18,
		left: 10,
	},
});
