import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ShoppingCart } from '../shopping-cart.js';
import { IS_IOS, MUSEO_SANS_NORMAL } from '../config/Constants';
import { testProperties } from '../config/TestProperties';
import i18n from '../config/i18n';
import { colors } from '../utils/colors';

export default class CartButton extends Component {
  constructor(props) {
    super(props);
    ShoppingCart.registerCartListener(this);

    // Need to pass this in explicitly since it's a subcomponent
    this.navigation = props.navigation;

    this.navigateToShoppingCart = this.navigateToShoppingCart.bind(this);
  }

  navigateToShoppingCart() {
    this.navigation.navigate('CartContents');
  }

  render() {

    var cartBadge = <View/>;
    var cartContents = ShoppingCart.getCartContents();

    if (cartContents.length > 0) {
      cartBadge = (
        <View style={ styles.badgeContainer }>
          <View style={ styles.badge }/>
          <Text style={ styles.badgeText }>{ cartContents.length }</Text>
        </View>
      );
    }

    return (
      <View { ...testProperties(i18n.t('cart.label')) }>
        <TouchableOpacity onPress={ this.navigateToShoppingCart }>
          <Image
            style={ styles.cart_image }
            resizeMode="contain"
            source={ require('../../img/menu-cart.png') }
          />
          { cartBadge }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  badge: {
    color: colors.white,
    zIndex: 10,
    top: 2,
    right: 2,
    padding: 5,
    backgroundColor: colors.slRed,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  badgeText: {
    color: colors.white,
    paddingLeft: 1,
    fontSize: 14,
    fontFamily: MUSEO_SANS_NORMAL,
    zIndex: 10,
    position: 'absolute',
    top: 4,
    right: 7,
  },
  cart_image: {
    height: IS_IOS ? 50 : 40,
    width: IS_IOS ? 50 : 40,
  },
});
