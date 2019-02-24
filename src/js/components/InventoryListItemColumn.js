import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MAKE_ACCESSIBLE_FOR_AUTOMATION, MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL, WINDOW_WIDTH } from '../config/Constants';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import { colors } from '../utils/colors';
import { testProperties } from '../config/TestProperties';
import i18n from '../config/i18n';
import { Credentials } from '../credentials';

export default class InventoryListItemColumn extends Component {
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

    // This prop will disable the navigation / flashy press if it should not be touchable
    this.isDisabled = this.props.disabled || false;

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

    this.navigation.navigate('InventoryItem', { id: itemId });
  }

  render() {
    let cartButton;

    if (ShoppingCart.isItemInCart(this.state.id)) {
      cartButton = (
        <Button
          buttonStyle={ [ styles.button_style, styles.remove_button_style ] }
          containerStyle={ styles.button_container_style }
          titleStyle={ [ styles.button_title_style, styles.remove_button_title_style ] }
          onPress={ this.removeFromCart }
          title={ i18n.t('inventoryItemPage.removeButton') }
          { ...testProperties(i18n.t('inventoryListPage.removeButton')) }
        />);
    } else {
      cartButton = (
        <Button
          buttonStyle={ styles.button_style }
          containerStyle={ styles.button_container_style }
          titleStyle={ styles.button_title_style }
          onPress={ this.addToCart }
          title={ i18n.t('inventoryItemPage.addButton') }
          { ...testProperties(i18n.t('inventoryListPage.addButton')) }
        />);
    }

    const { index } = this.props;

    return (
      <View
        // Add a margin to the right if it is the second element, so index number will be odd
        style={ [ styles.item_container, index % 2 === 0 ? {} : styles.item_container_margin_right ] }
        { ...testProperties(i18n.t('inventoryListPage.itemContainer')) }
      >
        <TouchableOpacity
          onPress={ this.navigateToItem }
          { ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
          disabled={ this.isDisabled }
          style={ styles.item_wrapper }
        >
          <View style={ styles.top_container }>
            <Image
              source={ this.state.image_url }
              style={ styles.item_image }
              resizeMode="contain"
            />

            <Text
              style={ styles.item_name }
              { ...testProperties(i18n.t('inventoryListPage.itemDescription')) }
            >{ this.state.name }</Text>
          </View>

          <View style={ styles.bottom_container }>
            <Divider style={ styles.divider }/>

            <Text style={ styles.price_text }{ ...testProperties(i18n.t('inventoryListPage.price')) }>
              ${ this.state.price }
            </Text>

            { cartButton }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  item_container_margin_right: {
    marginRight: 20,
  },
  item_wrapper: {
    flex: 1,
  },

  item_name: {
    color: colors.slRed,
    fontSize: 18,
    fontFamily: MUSEO_SANS_BOLD,
  },

  item_image: {
    flex: 1,
    // This is for keeping the aspect ratio and make it responsive
    height: ((WINDOW_WIDTH - 60) * 1.25) / 2,
    width: '100%',
    marginBottom: 20,
  },

  top_container: {
    flex: 1,
    justifyContent: 'flex-start',
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
    paddingBottom: 5,
    paddingTop: 5,
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
