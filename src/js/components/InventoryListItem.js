import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import { ShoppingCart } from '../shopping-cart';
import { Credentials } from '../credentials';
import SwagGridItem from './SwagGridItem';
import SwagRowItem from './SwagRowItem';
import { SCREENS } from '../config/Constants';
import { colors } from '../utils/colors';

export default class InventoryListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id,
			image_url: props.image_url,
			name: props.name,
			desc: props.desc,
			price: props.price,
			// Set our initial state now
			itemInCart: ShoppingCart.isItemInCart(props.id),
		};

		ShoppingCart.registerCartListener(this);

		if (Credentials.isProblemUser()) {
			// Replace our image with our broken link image
			this.state.image_url = require('../../img/sl-404.jpg');
		}

		// Need to pass this in explicitly since it's a subcomponent
		this.navigation = props.navigation;

		this.addToCart = this.addToCart.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.navigateToItem = this.navigateToItem.bind(this);

		this.listItem = React.createRef();
		this.previousLeft = 0;
		this.previousTop = 0;
		this.listItemStyles = { style: {} };
	}

	addToCart() {
		if (Credentials.isProblemUser()) {
			// Bail out now, don't add to cart if the item ID is odd
			if (this.state.id % 2 === 1) {
				return;
			}
		}

		ShoppingCart.addItem(this.state.id);
		this.setState({ itemInCart: true });
	}

	removeFromCart() {
		if (Credentials.isProblemUser()) {
			// Bail out now, don't remove from cart if the item ID is even
			if (this.state.id % 2 === 0) {
				return;
			}
		}

		ShoppingCart.removeItem(this.state.id);
		this.setState({ itemInCart: false });
	}

	navigateToItem() {
		let itemId = this.state.id;
		if (Credentials.isProblemUser()) {
			itemId += 1;
		}

		this.navigation.navigate(SCREENS.INVENTORY_ITEM, { id: itemId });
	}

	handlePanResponderEnd = (event, gestureState) => {
		if (this.isDropZone(gestureState, this.props.dropZoneValues)) {
			this.addToCart();
		}

		// Reset the shizzle
		this.previousLeft = 0;
		this.previousTop = 0;
		this.listItemStyles.style.left = 0;
		this.listItemStyles.style.top = 0;
		this.listItemStyles.style.zIndex = 1;
		this.listItemStyles.style.borderColor = colors.white;
		this.updateNativeStyles();
		this.props.disableScroll();
		this.props.enableDrag(false);
	};

	isDropZone = (gesture, dropZoneValues) => {
		const dz = dropZoneValues;

		return (
			gesture.moveY > dz.top &&
			gesture.moveY < dz.bottom &&
			gesture.moveX > dz.left &&
			gesture.moveX < dz.right
		);
	};

	// https://www.youtube.com/watch?v=tsM3N_7bNcE
	panResponder = PanResponder.create({
		onStartShouldSetPanResponder: ()=> true,
		onStartShouldSetPanResponderCapture: ()=> true,
		onMoveShouldSetPanResponder: ()=> true,
		onMoveShouldSetPanResponderCapture: ()=> true,
		onPanResponderGrant: () => {
			this.props.enableDrag(true);
			this.props.disableScroll();
			this.listItemStyles.style.opacity = 1;
			this.listItemStyles.style.zIndex = 9999;
			this.listItemStyles.style.borderColor = colors.slRed;
			this.updateNativeStyles();
		},
		onPanResponderMove: (event, gestureState) => {
			// Don't allow to drag lower, only to the dropzone
			if (this.previousTop + gestureState.dy < this.previousTop) {
				this.props.setDropZoneValues();
				this.listItemStyles.style.left = this.previousLeft + gestureState.dx;
				this.listItemStyles.style.top = this.previousTop + gestureState.dy;
				this.updateNativeStyles();
			}
		},
		onPanResponderRelease: this.handlePanResponderEnd,
		onPanResponderTerminate: this.handlePanResponderEnd,
	});

	UNSAFE_componentWillMount() {
		this.previousLeft = 0;
		this.previousTop = 0;
		this.listItemStyles = {
			style: {
				left: this.previousLeft,
				top: this.previousTop,
				zIndex: 1,
			},
		};
	}

	componentDidMount() {
		this.updateNativeStyles();
	}

	updateNativeStyles() {
		this.listItem && this.listItem.current.setNativeProps(this.listItemStyles);
	}

	render() {
		return (
			this.props.gridView ?
				<SwagGridItem
					addToCart={ this.addToCart }
					removeFromCart={ this.removeFromCart }
					navigateToItem={ this.navigateToItem }
					disableScroll={ this.props.disableScroll }
					draggable={ this.props.draggable }
					dropZoneValues={ this.props.dropZoneValues }
					setDropZoneValues={ this.props.setDropZoneValues }
					panResponder={ this.panResponder }
					listItem={ this.listItem }
					{ ...this.props }
				/> :
				<SwagRowItem
					addToCart={ this.addToCart }
					removeFromCart={ this.removeFromCart }
					navigateToItem={ this.navigateToItem }
					disableScroll={ this.props.disableScroll }
					draggable={ this.props.draggable }
					dropZoneValues={ this.props.dropZoneValues }
					setDropZoneValues={ this.props.setDropZoneValues }
					panResponder={ this.panResponder }
					listItem={ this.listItem }
					{ ...this.props }
				/>
		);
	}
}
