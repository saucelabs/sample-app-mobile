import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ShoppingCart } from '../shopping-cart.js';
import { IS_IOS, MUSEO_SANS_NORMAL } from '../config/Constants';
import { testProperties } from '../config/TestProperties';
import i18n from '../config/i18n';
import { colors } from '../utils/colors';
import { SCREENS } from '../Router';

export default class CartButton extends Component {
  constructor(props) {
    super(props);
    ShoppingCart.registerCartListener(this);
  }

  render() {

    var cartBadge = <View/>;
    var cartContents = ShoppingCart.getCartContents();

    if (cartContents.length > 0) {
      cartBadge = (
        <View style={ styles.badge_container }>
          <View style={ styles.badge }/>
          <Text style={ styles.badge_text }>{ cartContents.length }</Text>
        </View>
      );
    }

    return (
      <View { ...testProperties(i18n.t('cart.label')) }>
        <TouchableOpacity onPress={ ()=> this.props.navigation.navigate(SCREENS.CART_CONTENTS) }>
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
  badge_container: {
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
  badge_text: {
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
