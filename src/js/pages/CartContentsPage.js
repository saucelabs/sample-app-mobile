import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';

class CartItem extends Component {

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
    this.setState({itemVisible: false});
  }

  render () {

    if (this.state.itemVisible) {

      return (
        <View style={styles.item_container}>
          <View style={styles.item_quantity_box}>
            <Text style={styles.item_quantity}>1</Text>
          </View>
          <View style={styles.item_infobox}>
            <View style={styles.item_details}>
              <Text style={styles.item_name}>{this.item.name}</Text>
              <Text style={styles.item_desc}>{this.item.desc}</Text>
            </View>
            <View style={styles.item_price_bar}>
              <Text style={styles.price_text}>${this.item.price}</Text>
              <Button style={styles.item_cart_button} onPress={this.removeFromCart} title="REMOVE"/>
            </View>
          </View>
        </View>
      );
    } else {
      return ( <View /> );
    }
  }
}

export default class CartContentsPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var contents = ShoppingCart.getCartContents();

    return (
      <ThemeProvider>
        <AppHeader navigation={this.props.navigation}>
          <Image source={require('../../img/peek.png')} style={styles.peek_img} />
          <View style={styles.secondary_header}>
            <Text style={styles.header_title}>Your Cart</Text>
          </View>
          <View style={styles.section_header}>
            <Text style={styles.section_qty}>QTY</Text>
            <Text style={styles.section_desc}>DESCRIPTION</Text>
          </View>
          <ScrollView style={styles.container}>
            {contents.map((item, i) => {
              return (<CartItem key={i} item={InventoryData.ITEMS[item]} />);
            })}
            <View style={styles.cart_footer}>
              <Button buttonStyle={styles.checkout_button} containerStyle={styles.checkout_button_container} onPress={() => {this.props.navigation.navigate('CheckoutPageOne');}} title="CHECKOUT"/>
              <Button buttonStyle={styles.cancel_button} containerStyle={styles.checkout_button_container} onPress={() => {this.props.navigation.navigate('InventoryList');}} title="CONTINUE SHOPPING"/>
            </View>
          </ScrollView>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  secondary_header: {
    height: 80,
    backgroundColor: '#474c55',
    flexDirection: 'row',
  },
  section_header: {
    height: 35,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 5,
  },
  section_qty: {
    fontSize: 18,
    color: '#000',
    paddingTop: 3,
  },
  section_desc: {
    fontSize: 18,
    color: '#000',
    paddingTop: 3,
    left: 70,
  },
  header_title: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 90,
    marginTop: 32,
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
  peek_img: {
    width: 71,
    height: 70,
    top: 108,
    left: 5,
    position: 'absolute',
    zIndex: 10,
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
  item_desc: {

  },
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
  cart_footer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  checkout_button: {
    flex: 1,
  },
  cancel_button: {
    flex: 1,
    backgroundColor: '#F00',
  },
  checkout_button_container: {
    marginTop: 10,
    marginBottom: 10,
  },
});
