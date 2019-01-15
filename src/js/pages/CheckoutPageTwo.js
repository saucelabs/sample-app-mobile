import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';
import { IS_IOS } from '../config/Constants';

class SummaryItem extends Component {

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

    // Need to pass this in explicitly since it's a subcomponent
    this.navigation = props.navigation;

    this.navigateToItem = this.navigateToItem.bind(this);
  }

  navigateToItem() {

    var itemId = this.state.id;
    if (Credentials.isProblemUser()) {
      itemId += 1;
    }

    this.navigation.navigate('InventoryItem', {id: itemId});
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
            </View>
          </View>
        </View>
      );
    } else {
      return ( <View /> );
    }
  }
}

export default class CheckoutPageTwo extends Component {

  constructor(props) {
    super(props);

    this.clearCart = this.clearCart.bind(this);
  }

  clearCart() {
    // No cart clear on order complete for the problem user
    if (!Credentials.isProblemUser()) {
      // Wipe out our shopping cart
      ShoppingCart.resetCart();
    }

    // Checkout complete, redirect to our order complete page
    this.props.navigation.navigate('CheckoutComplete');
  }

  render() {

    var contents = ShoppingCart.getCartContents();
    var orderTotal = 0;

    for (var curItem in contents) {
      orderTotal = orderTotal + InventoryData.ITEMS[contents[curItem]].price;
      if (Credentials.isProblemUser()) {
        // double up for the problem user
        orderTotal = orderTotal + InventoryData.ITEMS[contents[curItem]].price;
      }
    }

    var orderTax = (orderTotal * 0.08).toFixed(2);

    return (
      <ThemeProvider>
        <AppHeader navigation={this.props.navigation}>
          <Image source={require('../../img/peek.png')} style={styles.peek_img} />
          <View style={styles.secondary_header}>
            <Text style={styles.header_title}>Checkout: Overview</Text>
          </View>
          <View style={styles.section_header}>
            <Text style={styles.section_qty}>QTY</Text>
            <Text style={styles.section_desc}>DESCRIPTION</Text>
          </View>
          <ScrollView style={styles.container}>
            {contents.map((item, i) => {
              return (<SummaryItem key={i} item={InventoryData.ITEMS[item]} />);
            })}

            <View style={styles.summary_section}>
              <Text style={styles.summary_info_label}>Payment Information:</Text>
              <Text style={styles.summary_value_label}>SauceCard #31337</Text>
            </View>
            <View style={styles.summary_section}>
              <Text style={styles.summary_info_label}>Shipping Information:</Text>
              <Text style={styles.summary_value_label}>FREE PONY EXPRESS DELIVERY!</Text>
            </View>
            <View style={styles.summary_section}>
              <Text style={styles.summary_subtotal_label}>Item total: ${orderTotal}</Text>
              <Text style={styles.summary_tax_label}>Tax: ${orderTax}</Text>
              <Text style={styles.summary_total_label}>Total: ${(orderTotal + parseFloat(orderTax)).toFixed(2)}</Text>
            </View>

            <View style={styles.cart_footer}>
              <Button buttonStyle={styles.checkout_button} containerStyle={styles.checkout_button_container} onPress={this.clearCart} title="FINISH"/>
              <Button buttonStyle={styles.cancel_button} containerStyle={styles.checkout_button_container} onPress={() => {this.props.navigation.navigate('InventoryList');}} title="CANCEL"/>
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
    paddingTop: 5,
  },
  peek_img: {
    width: 71,
    height: 70,
    top: IS_IOS ? 100 : 80,
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
    borderTopWidth: 3,
    borderTopColor: '#000',
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
  summary_section: {
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  summary_info_label: {
    fontSize: 18,
    padding: 4,
  },
  summary_value_label: {
    fontSize: 18,
    fontWeight: '800',
    padding: 4,
  },
  summary_subtotal_label: {
    fontSize: 18,
    padding: 4,
  },
  summary_tax_label: {
    fontSize: 18,
    padding: 4,
  },
  summary_total_label: {
    fontSize: 22,
    fontWeight: '800',
    padding: 4,
  },
});
