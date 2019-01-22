import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../components/AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import {testProperties} from '../config/TestProperties';

export default class InventoryItem extends Component {

  constructor(props) {
    super(props);

    var inventoryId = this.props.navigation.getParam('id', -1);
    if ((inventoryId >= 0) && (InventoryData.ITEMS.length > inventoryId)) {
      this.item = InventoryData.ITEMS[inventoryId];
    } else {
      this.item = {
          name: i18n.t('inventoryItemPage.itemNotFound.name'),
          desc: i18n.t('inventoryItemPage.itemNotFound.description'),
          image_url: require('../../img/sl-404.jpg'),
          price: i18n.t('inventoryItemPage.itemNotFound.price'),

      };
    }
    this.item.id = inventoryId;

    this.state = {
      // Set our initial state now
      itemInCart: ShoppingCart.isItemInCart(inventoryId),
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.navigate('InventoryList');
  }

  addToCart() {

    if (Credentials.isProblemUser()) {
      // Bail out now, don't add to cart if the item ID is odd
      if (this.state.id % 2 === 1) {
        return;
      }
    }

    ShoppingCart.addItem(this.item.id);
    this.setState({itemInCart: true});
  }

  removeFromCart() {

    if (Credentials.isProblemUser()) {
      // Bail out now, don't remove from cart if the item ID is even
      if (this.state.id % 2 === 0) {
        return;
      }
    }

    ShoppingCart.removeItem(this.item.id);
    this.setState({itemInCart: false});
  }

  render () {

    var cartButton;

    if (this.state.itemInCart) {
      cartButton = <Button containerStyle={styles.item_cart_button} onPress={this.removeFromCart}
                           title={i18n.t('inventoryItemPage.removeButton')} {...testProperties(i18n.t('inventoryItemPage.removeButton'))}/>;
    } else {
      cartButton = <Button containerStyle={styles.item_cart_button} onPress={this.addToCart}
                           title={i18n.t('inventoryItemPage.addButton')} {...testProperties(i18n.t('inventoryItemPage.addButton'))}/>;
    }

    return (
        <ThemeProvider>
          <AppHeader navigation={this.props.navigation}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" {...testProperties(i18n.t('inventoryItemPage.screen'))}>
              <Button containerStyle={styles.item_back_button} onPress={this.goBack}
                      title={i18n.t('inventoryItemPage.backButton')} {...testProperties(i18n.t('inventoryItemPage.backButton'))}/>
              <View style={styles.item_container}>
                <Image source={this.item.image_url} style={styles.item_image} />
                <View style={styles.item_infobox} {...testProperties(i18n.t('inventoryItemPage.itemDescription'))}>
                  <View style={styles.item_details}>
                    <Text style={styles.item_name}>{this.item.name}</Text>
                    <Text style={styles.item_desc}>{this.item.desc}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.item_price_bar}>
                <Text style={styles.price_text} {...testProperties(i18n.t('inventoryItemPage.price'))}>${this.item.price}</Text>
                { cartButton }
              </View>
            </ScrollView>
          </AppHeader>
        </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  item_back_button: {
    right: 10,
    position: 'absolute',
    backgroundColor: '#57c1e8',
    zIndex: 10,
    margin: 5,
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
  item_image: {
    width: 240,
    height: 300,
    flex: 1,
  },
  item_container: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 40,
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 1,
    padding: 5,
  },
  item_price_bar: {
    flexDirection: 'row',
    padding: 5,
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
  item_desc: {

  },
});
