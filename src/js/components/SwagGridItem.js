import React, { Component } from 'react';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { Animated, PanResponder, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

	// https://github.com/facebook/react-native/blob/0.61-stable/RNTester/js/examples/PanResponder/PanResponderExample.js
	_handleStartShouldSetPanResponder = (
		event,
		gestureState,
	) => {
		// Should we become active when the user presses down on the circle?
		// return true;
		return this.props.draggable;
	};

	_handleMoveShouldSetPanResponder = (
		event,
		gestureState,
	) => {
		// Should we become active when the user moves a touch over the circle?
		// return true;
		return this.props.draggable;
	};

	_handlePanResponderGrant = (
		event,
		gestureState,
	) => {
		this.props.disableScroll();
		this._listItemStyles.style.opacity = 1;
		this._listItemStyles.style.zIndex = 9999;
		this._listItemStyles.style.borderWidth = 2;
		this._listItemStyles.style.borderStyle = 'dashed';
		this._listItemStyles.style.borderColor = colors.slRed;
		this._listItemStyles.style.padding = 10;
		this._updateNativeStyles();
	};

	_handlePanResponderMove = (event, gestureState) => {
		this.props.setDropZoneValues();
		this._listItemStyles.style.left = this._previousLeft + gestureState.dx;
		this._listItemStyles.style.top = this._previousTop + gestureState.dy;
		this._updateNativeStyles();
	};

	_handlePanResponderEnd = (event, gestureState) => {
		if (this._isDropZone(gestureState, this.props.dropZoneValues)) {
			this.props.addToCart();
		}

		this._unHighlight();
		this._previousLeft = 0;
		this._previousTop = 0;
		this._listItemStyles.style.left = 0;
		this._listItemStyles.style.top = 0;
		this._listItemStyles.style.zIndex = 1;
		this._listItemStyles.style.borderWidth = 0;
		this._listItemStyles.style.borderColor = colors.white;
		this._listItemStyles.style.padding = 0;
		this._updateNativeStyles();
		this.props.disableScroll();
		this.props.enableDrag(false);
	};

	_isDropZone = (gesture, dropZoneValues) => {
		const dz = dropZoneValues;

		return (
			gesture.moveY > dz.top &&
			gesture.moveY < dz.bottom &&
			gesture.moveX > dz.left &&
			gesture.moveX < dz.right
		);
	};

	_panResponder = PanResponder.create({
		onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
		onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
		onPanResponderGrant: this._handlePanResponderGrant,
		onPanResponderMove: this._handlePanResponderMove,
		onPanResponderRelease: this._handlePanResponderEnd,
		onPanResponderTerminate: this._handlePanResponderEnd,
	});

	_previousLeft = 0;
	_previousTop = 0;
	_listItemStyles = { style: {} };
	_zIndex = 1;
	listItem = null;

	UNSAFE_componentWillMount() {
		this._previousLeft = 0;
		this._previousTop = 0;
		this._listItemStyles = {
			style: {
				left: this._previousLeft,
				top: this._previousTop,
				zIndex: this.zIndex,
			},
		};
	}

	componentDidMount() {
		this._updateNativeStyles();
	}

	_highlight() {
		this._updateNativeStyles();
	}

	_unHighlight() {
		this._updateNativeStyles();
	}

	_updateNativeStyles() {
		this.listItem && this.listItem.setNativeProps(this._listItemStyles);
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
					this.props.draggable ? { opacity: 0.5 } : {},
				] }
				{ ...testProperties(I18n.t('inventoryListPage.itemContainer')) }
				ref={ listItem => {
					this.listItem = listItem;
				} }
				{ ...this._panResponder.panHandlers }
			>
				<TouchableOpacity
					onPress={ navigateToItem }
					onLongPress={ () => this.props.enableDrag(true) }
					{ ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
					style={ styles.item_wrapper }
				>
					<View style={ styles.top_container }>
						<Image
							source={ image_url }
							style={ styles.item_image }
							resizeMode="contain"
						/>

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
		marginBottom: 20,
		marginTop: 20,
		marginLeft: 20,
		zIndex: 1,
	},
	item_container_margin_right: {
		marginRight: 20,
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
});
