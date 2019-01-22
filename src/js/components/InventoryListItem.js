import React, { Component } from 'react';
import { ShoppingCart } from '../shopping-cart';
import { Credentials } from '../credentials';
import { Button } from 'react-native-elements';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MAKE_ACCESSIBLE_FOR_AUTOMATION } from '../config/Constants';


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

    var itemId = this.state.id;
    if (Credentials.isProblemUser()) {
      itemId += 1;
    }

    this.navigation.navigate('InventoryItem', { id: itemId });
  }

  render() {

    var cartButton;

    if (ShoppingCart.isItemInCart(this.state.id)) {
      cartButton = (
        <Button
          containerStyle={ styles.item_cart_button }
          onPress={ this.removeFromCart }
          title={ i18n.t('inventoryItemPage.removeButton') }
          { ...testProperties(i18n.t('inventoryListPage.removeButton')) }
        />);
    } else {
      cartButton = (
        <Button
          containerStyle={ styles.item_cart_button }
          onPress={ this.addToCart }
          title={ i18n.t('inventoryItemPage.addButton') }
          { ...testProperties(i18n.t('inventoryListPage.addButton')) }
        />);
    }
    // Needed to add `accessible={false}` to the TouchableOpacity component, otherwise the components are not accessible and shown
    // in a flat UI structure
    return (
      <View style={ styles.item_container }{ ...testProperties(i18n.t('inventoryListPage.itemContainer')) }>
        <Image source={ this.state.image_url } style={ styles.item_image }/>
        <TouchableOpacity
          style={ styles.item_infobox }
          onPress={ this.navigateToItem }
          { ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
        >
          <View style={ styles.item_details } { ...testProperties(i18n.t('inventoryListPage.itemDescription')) }>
            <Text style={ styles.item_name }>{ this.state.name }</Text>
            <Text style={ styles.item_desc }>{ this.state.desc }</Text>
          </View>
          <View style={ styles.item_price_bar }>
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
  item_image: {
    width: 80,
    height: 100,
    flex: 1,
  },
  item_container: {
    flexDirection: 'row',
    padding: 5,
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 4,
    padding: 5,
  },
  item_price_bar: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  item_cart_button: {
    flex: 3,
    backgroundColor: '#57c1e8',
  },
  item_details: {
    flexDirection: 'column',
  },
  price_text: {
    color: '#569210',
    fontSize: 18,
    flex: 2,
    paddingTop: 10,
  },
  item_name: {
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 5,
  },
  item_desc: {},
});
