import React, { Component } from 'react';
import I18n from '../config/I18n';
import { Credentials } from '../credentials';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShoppingCart } from '../shopping-cart';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import { STATUS_BAR_HEIGHT } from './StatusBar';
import { MUSEO_SANS_BOLD, SCREENS } from '../config/Constants';

export default class DrawerLinks extends Component {

	constructor(props) {
		super(props);

		this.handleAllItemsLink = this.handleAllItemsLink.bind(this);
		this.handleWebviewLink = this.handleWebviewLink.bind(this);
		this.handleAboutLink = this.handleAboutLink.bind(this);
		this.handleLogoutLink = this.handleLogoutLink.bind(this);
		this.handleResetLink = this.handleResetLink.bind(this);
		this.handleCloseMenu = this.handleCloseMenu.bind(this);
		this.handleQrCodeLink = this.handleQrCodeLink.bind(this);
		this.handleGeoLocationLink = this.handleGeoLocationLink.bind(this);
		this.handleDrawingLink = this.handleDrawingLink.bind(this);
	}

	handleAllItemsLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.INVENTORY_LIST);
	}

	handleWebviewLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.WEBVIEW_SELECTION);
	}

	handleQrCodeLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.QR_CODE_SCANNER_SCREEN);
	}

	handleGeoLocationLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.GEO_LOCATION_SCREEN);
	}

	handleDrawingLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.DRAWING);
	}

	handleAboutLink() {
		const aboutUrl = I18n.t(Credentials.isProblemUser() ? 'appHeader.404Url' : 'appHeader.url');

		this.handleCloseMenu();
		Linking.openURL(aboutUrl);
	}

	handleLogoutLink() {
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate(SCREENS.LOGIN);
	}

	handleResetLink() {
		this.props.navigation.closeDrawer();
		ShoppingCart.resetCart();
	}

	handleCloseMenu() {
		this.props.navigation.closeDrawer();
	}

	render() {

		return (
			<View style={ styles.container }>
				<TouchableOpacity
					onPress={ this.handleCloseMenu }
					{ ...testProperties(I18n.t('menu.close')) }
				>
					<Image
						style={ styles.menu_close }
						resizeMode="contain"
						source={ require('../../img/menu-close.png') }
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleAllItemsLink }
					{ ...testProperties(I18n.t('menu.allItems')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.allItems') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleWebviewLink }
					{ ...testProperties(I18n.t('menu.webview')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.webview') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleQrCodeLink }
					{ ...testProperties(I18n.t('menu.qrCode')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.qrCode') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleGeoLocationLink }
					{ ...testProperties(I18n.t('menu.geoLocation')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.geoLocation') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleDrawingLink }
					{ ...testProperties(I18n.t('menu.drawing')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.drawing') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleAboutLink }
					{ ...testProperties(I18n.t('menu.about')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.about') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleLogoutLink }
					{ ...testProperties(I18n.t('menu.logout')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.logout') }</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.menu_button }
					onPress={ this.handleResetLink }
					{ ...testProperties(I18n.t('menu.reset')) }
				>
					<Text style={ styles.menu_item_text }>{ I18n.t('menu.reset') }</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		flexDirection: 'column',
		paddingTop: STATUS_BAR_HEIGHT,
		paddingLeft: 10,
		paddingRight: 10,
	},
	menu_close: {
		alignSelf: 'flex-end',
		height: 60,
		width: 60,
	},
	menu_button: {
		backgroundColor: colors.white,
		margin: 10,
		paddingBottom: 10,
		borderBottomWidth: 3,
		borderBottomColor: colors.gray,
	},
	menu_item_text: {
		color: colors.gray,
		fontFamily: MUSEO_SANS_BOLD,
		fontSize: 20,
	},
});
