import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';

export default class InventoryItem extends Component {

  constructor(props) {
    super(props);

    var inventoryId = this.props.navigation.getParam('id', -1);
    if ((inventoryId >= 0) && (InventoryData.ITEMS.length > inventoryId)) {
      this.item = InventoryData.ITEMS[inventoryId];
    } else {
      this.item = {
          name: 'ITEM NOT FOUND',
          desc: `We're sorry, but your call could not be completed as dialled.
Please check your number, and try your call again.
If you are in need of assistance, please dial 0 to be connected with an operator.
This is a recording.
4 T 1.`,
          image_url: require('../../img/sl-404.jpg'),
          price: '√-1'
          
      };
    }
    this.item.id = inventoryId;
    
    this.state = {
      // Set our initial state now
      itemInCart: ShoppingCart.isItemInCart(inventoryId)
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
      if (this.state.id % 2 == 1) {
        return;
      }
    }

    ShoppingCart.addItem(this.item.id);
    this.setState({itemInCart: true});
  }

  removeFromCart() {

    if (Credentials.isProblemUser()) {
      // Bail out now, don't remove from cart if the item ID is even
      if (this.state.id % 2 == 0) {
        return;
      }
    }

    ShoppingCart.removeItem(this.item.id);
    this.setState({itemInCart: false});
  }

  render () {    

    var cartButton;
    
    if (this.state.itemInCart) {
      cartButton = <Button containerStyle={styles.item_cart_button} onPress={this.removeFromCart} title="REMOVE"/>;
    } else {
      cartButton = <Button containerStyle={styles.item_cart_button} onPress={this.addToCart} title="ADD TO CART"/>;
    }

    return (
        <ThemeProvider>
          <AppHeader navigation={this.props.navigation}>
            <ScrollView style={styles.container}>
              <Button containerStyle={styles.item_back_button} onPress={this.goBack} title="<- BACK"/>
              <View style={styles.item_container}>
                <Image source={this.item.image_url} style={styles.item_image} />
                <View style={styles.item_infobox}>
                  <View style={styles.item_details}>
                    <Text style={styles.item_name}>{this.item.name}</Text>
                    <Text style={styles.item_desc}>{this.item.desc}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.item_price_bar}>
                <Text style={styles.price_text}>${this.item.price}</Text>
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
    margin: 5
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
  item_image: {
    width: 240,
    height: 300,
    flex: 1
  },
  item_container: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 40
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 1,
    padding: 5
  },
  item_price_bar: {
    flexDirection: 'row',
    padding: 5
  },
  item_cart_button: {
    flex: 3,
    backgroundColor: '#57c1e8'
  },
  item_details: {
    flexDirection: 'column'
  },
  price_text: {
    color: '#569210',
    fontSize: 18,
    flex: 2,
    paddingTop: 10
  },
  item_name: {
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 5
  },
  item_desc: {
    
  }
});