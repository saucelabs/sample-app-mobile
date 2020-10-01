import React, { Component } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import {
	MAKE_ACCESSIBLE_FOR_AUTOMATION,
	MUSEO_SANS_BOLD,
	MUSEO_SANS_NORMAL,
	WINDOW_WIDTH,
} from '../config/Constants';
import { colors } from '../utils/colors';

export default class SwagGridItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let cartButton;
		const { addToCart, id, index, image_url, name, navigateToItem, price, removeFromCart } = this.props;

		if (ShoppingCart.isItemInCart(id)) {
			cartButton = (
				<Button
					buttonStyle={ [ styles.button_style, styles.remove_button_style ] }
					titleStyle={ [ styles.button_title_style, styles.remove_button_title_style ] }
					onPress={ removeFromCart }
					title={ I18n.t('inventoryItemPage.removeButton') }
					{ ...testProperties(I18n.t('inventoryListPage.removeButton')) }
				/>);
		} else {
			cartButton = (
				<Button
					buttonStyle={ styles.button_style }
					titleStyle={ styles.button_title_style }
					onPress={ addToCart }
					title={ I18n.t('inventoryItemPage.addButton') }
					{ ...testProperties(I18n.t('inventoryListPage.addButton')) }
				/>);
		}

		return (
			<Animated.View
				// Add a margin to the right if it is the second element, so index number will be odd
				style={ [
					styles.item_container,
					index % 2 === 0 ? {} : styles.item_container_margin_right,
					this.props.draggable ? styles.transparentItem : {},
				] }
				{ ...testProperties(I18n.t('inventoryListPage.itemContainer')) }
				ref={ this.props.listItem }
			>
				<TouchableOpacity
					onPress={ navigateToItem }
					{ ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
					style={ styles.item_wrapper }
				>
					<View style={ styles.top_container }>
						<View>
							<Image
								source={ image_url }
								style={ styles.item_image }
								resizeMode="contain"
							/>
							<Icon
								style={ styles.tapIcon }
								name="gesture-tap"
							/>
						</View>

						<Text
							style={ styles.item_name }
							{ ...testProperties(I18n.t('inventoryListPage.itemTitle')) }
						>{ name }</Text>
					</View>

					<View style={ styles.bottom_container }>
						<Divider style={ styles.divider }/>

						<Text style={ styles.price_text }{ ...testProperties(I18n.t('inventoryListPage.price')) }>
							${ price }
						</Text>

						{ !ShoppingCart.isItemInCart(id) && (
							<View
								style={ styles.dragIconContainer }
								{ ...this.props.panResponder.panHandlers }
								{ ...testProperties(I18n.t('inventoryListPage.dragHandle')) }
							>
								<Icon
									style={ styles.icon }
									name="drag"
								/>
							</View>) }

						{ cartButton }
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	item_container: {
		backgroundColor: colors.white,
		flex: 1,
		marginBottom: 10,
		marginTop: 10,
		marginLeft: 10,
		padding: 10,
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: colors.white,
		zIndex: 1,
	},
	item_container_margin_right: {
		marginRight: 8,
	},
	item_wrapper: {
		flex: 1,
	},
	top_container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	item_image: {
		flex: 1,
		// This is for keeping the aspect ratio and make it responsive
		height: ((WINDOW_WIDTH - 60) * 1.25) / 2,
		width: '100%',
		marginBottom: 20,
	},
	item_name: {
		color: colors.slRed,
		fontSize: 18,
		fontFamily: MUSEO_SANS_BOLD,
	},
	bottom_container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	divider: {
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
		width: '40%',
		marginBottom: 10,
		marginTop: 20,
	},
	price_text: {
		color: colors.gray,
		fontSize: 22,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	button_style: {
		backgroundColor: colors.white,
		borderColor: colors.slRed,
		borderWidth: 3,
		borderRadius: 0,
		paddingBottom: 10,
		paddingTop: 10,
		marginTop: 10,
		elevation: 0,
	},
	button_title_style: {
		color: colors.slRed,
		fontSize: 16,
		fontFamily: MUSEO_SANS_BOLD,
	},
	remove_button_style: {
		borderColor: colors.gray,
	},
	remove_button_title_style: {
		color: colors.gray,
	},
	dragIconContainer: {
		height: 48,
		position: 'absolute',
		bottom: 0,
		left: -2,
		zIndex: 4,
		justifyContent: 'center',

	},
	icon: {
		color: colors.slRed,
		fontSize: 26,
	},
	tapIcon: {
		color: colors.slRed,
		fontSize: 18,
		position: 'absolute',
		bottom: 30,
		right: 0,
		zIndex: 6,
	},
	transparentItem: {
		opacity: 0.5,
	},
});
