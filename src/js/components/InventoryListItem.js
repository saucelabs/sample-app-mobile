import React, { Component } from 'react';
import { ShoppingCart } from '../shopping-cart';
import { Credentials } from '../credentials';
import SwagGridItem from './SwagGridItem';
import SwagRowItem from './SwagRowItem';
import { SCREENS } from '../Router';

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

  render() {
    return (
      this.props.gridView ?
        <SwagGridItem
          addToCart={ this.addToCart }
          removeFromCart={ this.removeFromCart }
          navigateToItem={ this.navigateToItem }
          { ...this.props }
        /> :
        <SwagRowItem
          addToCart={ this.addToCart }
          removeFromCart={ this.removeFromCart }
          navigateToItem={ this.navigateToItem }
          { ...this.props }
        />
    );
  }
}
