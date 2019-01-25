import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ShoppingCart } from '../shopping-cart.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';

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

    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart() {

    ShoppingCart.removeItem(this.item.id);
    this.setState({ itemVisible: false });
  }

  render() {

    if (this.state.itemVisible) {

      return (
        <View style={ styles.item_container } { ...testProperties(i18n.t('cartContent.cartItem.itemContainer')) }>
          <View style={ styles.item_quantity_box } { ...testProperties(i18n.t('cartContent.cartItem.amount')) }>
            <Text style={ styles.item_quantity }>1</Text>
          </View>
          <View style={ styles.item_infobox } { ...testProperties(i18n.t('cartContent.cartItem.description')) }>
            <View style={ styles.item_details }>
              <Text style={ styles.item_name }>{ this.item.name }</Text>
              <Text style={ styles.item_desc }>{ this.item.desc }</Text>
            </View>
            <View style={ styles.item_price_bar }>
              <Text style={ styles.price_text }>${ this.item.price }</Text>
              <Button style={ styles.item_cart_button } onPress={ this.removeFromCart } title={ i18n.t('cartContent.cartItem.remove') }
                      { ...testProperties(i18n.t('cartContent.cartItem.remove')) }/>
            </View>
          </View>
        </View>
      );
    } else {
      return (<View/>);
    }
  }
}

const styles = StyleSheet.create({
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
  item_quantity: {
    color: '#000',
    fontSize: 18,
    padding: 4,
  },
  item_quantity_box: {
    borderWidth: 2,
    borderColor: '#000',
    width: 22,
    height: 35,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
  },
});
