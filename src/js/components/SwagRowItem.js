import React, { Component } from 'react';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import {
	IS_IOS,
	MAKE_ACCESSIBLE_FOR_AUTOMATION,
	MUSEO_SANS_BOLD,
	MUSEO_SANS_NORMAL,
} from '../config/Constants';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SwagRowItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let cartButton;
		const { addToCart, desc, id, image_url, name, navigateToItem, price, removeFromCart } = this.props;

		if (ShoppingCart.isItemInCart(id)) {
			cartButton = (
				<Button
					buttonStyle={ [ styles.button_style, styles.remove_button_style ] }
					titleStyle={ [ styles.button_title_style, styles.remove_button_title_style ] }
					onPress={ removeFromCart }
					title="-"
					{ ...testProperties(I18n.t('inventoryListPage.removeButton')) }
				/>);
		} else {
			cartButton = (
				<Button
					buttonStyle={ styles.button_style }
					titleStyle={ styles.button_title_style }
					onPress={ addToCart }
					title="+"
					{ ...testProperties(I18n.t('inventoryListPage.addButton')) }
				/>);
		}

		return (
			<Animated.View
				style={ [ styles.animatedContainer, this.props.draggable ? styles.transparentItem : {} ] }
				ref={ this.props.listItem }
			>
				<TouchableOpacity
					onPress={ navigateToItem }
					{ ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
					style={ styles.item_container }
					{ ...testProperties(I18n.t('inventoryListPage.itemContainer')) }
				>
					<View style={ styles.image_container }>
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

					<View style={ styles.right_container }>
						<View style={ styles.top_container }>
							<Text style={ styles.item_name }{ ...testProperties(I18n.t('inventoryListPage.itemTitle')) }>
								{ name }
							</Text>
							<Text style={ styles.item_desc } numberOfLines={ 2 } { ...testProperties(I18n.t('inventoryListPage.itemDescription')) }>
								{ desc }
							</Text>
						</View>

						<View style={ styles.bottom_container }>
							<View style={ styles.bottom_left }>
								<Text style={ styles.price_text }{ ...testProperties(I18n.t('inventoryListPage.price')) }>
									${ price }
								</Text>

								<Divider style={ styles.divider }/>
							</View>
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
								</View>
							) }
							<View style={ styles.bottom_right }>
								{ cartButton }
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	animatedContainer: {
		backgroundColor: colors.white,
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: colors.white,
	},
	item_container: {
		flex: 1,
		minHeight: 124,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
	image_container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	item_image: {
		flex: 1,
		alignItems: 'flex-start',
		height: undefined,
		width: undefined,
	},
	right_container: {
		flex: 2,
		marginLeft: 20,
		flexDirection: 'column',
	},
	top_container: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	item_name: {
		color: colors.slRed,
		fontSize: 18,
		fontFamily: MUSEO_SANS_BOLD,
	},
	item_desc: {
		color: colors.gray,
		fontSize: 16,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	bottom_container: {
		flex: 1,
		flexDirection: 'row',
	},
	bottom_left: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	price_text: {
		color: colors.gray,
		fontSize: 22,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	bottom_right: {
		marginLeft: 10,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	divider: {
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
		width: '100%',
		marginTop: 5,
	},
	button_style: {
		backgroundColor: colors.white,
		borderColor: colors.slRed,
		borderWidth: 3,
		borderRadius: 0,
		elevation: 0,
		width: 55,
		height: 40,
		padding: 0,
	},
	button_title_style: {
		paddingTop: 0,
		marginTop: IS_IOS ? -10 : -5,
		color: colors.slRed,
		fontSize: 42,
		fontFamily: MUSEO_SANS_NORMAL,
		marginLeft: 15,
	},
	remove_button_style: {
		borderColor: colors.gray,
		width: 40,
	},
	remove_button_title_style: {
		color: colors.gray,
		marginLeft: 0,
	},
	dragIconContainer: {
		height: 40,
		position: 'absolute',
		bottom: 0,
		right: 28,
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
		bottom: 5,
		right: 15,
		zIndex: 6,
	},
	transparentItem: {
		opacity: 0.5,
	},
});
