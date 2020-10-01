import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ShoppingCart } from '../shopping-cart.js';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL } from '../config/Constants';
import RemoveButton from './RemoveButton';

export default class CartItem extends Component {
	constructor(props) {
		super(props);

		this.item = props.item;
		this.state = {
			itemVisible: true,
		};

		if (props.item == null) {
			// Hide this if the item is invalid
			this.state.itemVisible = false;
		}

		this.showRemoveButton = this.props.showRemoveButton;

		this.removeFromCart = this.removeFromCart.bind(this);
	}

	removeFromCart() {
		ShoppingCart.removeItem(this.item.id);
		this.setState({ itemVisible: false });
	}

	render() {
		if (this.state.itemVisible) {
			const removeButton = this.showRemoveButton ? (
				<RemoveButton
					onPress={ this.removeFromCart }
					title={ I18n.t('cartContent.cartItem.remove') }
				/>
			) : null;

			const RightActions = ({dragX, onPress }) => {
				const scale = dragX.interpolate({
					inputRange: [ -100, 0 ],
					outputRange: [ 1, 0 ],
					extrapolate: 'clamp',
				});

				return (
					<TouchableOpacity
						onPress={ onPress }
						{ ...testProperties(I18n.t('cartContent.cartItem.delete')) }
					>
						<View style={ styles.rightAction }>
							<Animated.View style={ { transform: [ { scale } ] }  }>
								<Icon
									name="trash-can-outline"
									style={styles.deleteIcon}
								/>
							</Animated.View>
						</View>
					</TouchableOpacity>
				);
			};

			return (
				<View>
					<Swipeable
						renderRightActions={ (progress, dragX) => (
							<RightActions dragX={ dragX } onPress={ this.removeFromCart }/>
						) }
					>
						<View style={ styles.item_container } { ...testProperties(I18n.t('cartContent.cartItem.itemContainer')) }>

							<View style={ styles.item_quantity_box } { ...testProperties(I18n.t('cartContent.cartItem.amount')) }>
								<Text style={ styles.item_quantity }>1</Text>
							</View>
							<Icon
								name="gesture-swipe-left"
								style={styles.swipeIcon}
							/>

							<View style={ styles.item_info_box }>
								<View style={ styles.item_details } { ...testProperties(I18n.t('cartContent.cartItem.description')) }>
									<Text style={ styles.item_name }>{ this.item.name }</Text>
									<Text style={ styles.item_desc }>{ this.item.desc }</Text>
								</View>
								<Divider style={ [ styles.divider, styles.description_price_divider ] }/>
								<View { ...testProperties(I18n.t('cartContent.cartItem.price')) }>
									<Text style={ styles.price_text }>${ this.item.price }</Text>
									{ removeButton }
								</View>
							</View>

						</View>
					</Swipeable>
					<Divider style={ styles.divider }/>
				</View>
			);
		}

		return (<View/>);
	}
}

const styles = StyleSheet.create({
	item_container: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		paddingBottom: 25,
		paddingTop: 15,
	},
	item_quantity_box: {
		borderWidth: 2,
		borderColor: colors.lightGray,
		width: 35,
		height: 35,
	},
	item_quantity: {
		color: colors.gray,
		fontFamily: MUSEO_SANS_NORMAL,
		fontSize: 24,
		textAlign: 'center',
	},
	item_info_box: {
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 25,
	},
	price_text: {
		color: colors.slRed,
		fontSize: 28,
		fontFamily: MUSEO_SANS_NORMAL,
		paddingBottom: 20,
	},
	item_cart_button: {
		flex: 3,
		backgroundColor: '#57c1e8',
	},
	item_details: {
		flexDirection: 'column',
	},
	item_name: {
		color: colors.slRed,
		fontSize: 20,
		fontFamily: MUSEO_SANS_BOLD,
		paddingBottom: 10,
	},
	item_desc: {
		color: colors.gray,
		fontSize: 16,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	divider: {
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
		width: '100%',
		marginBottom: 10,
		marginTop: 15,
	},
	description_price_divider: {
		width: '40%',
		marginBottom: 30,
		marginTop: 30,
	},
	swipeIcon: {
		color: colors.gray,
		fontSize: 28,
		position: 'absolute',
		bottom: 40,
		left: 2,
	},
	rightAction: {
		backgroundColor: colors.slRed,
		justifyContent: 'center',
		flex: 1,
		alignItems: 'flex-end',
		marginLeft: 10,
	},
	deleteIcon: {
		color: colors.white,
		padding: 20,
		fontSize: 28,
	},
});
