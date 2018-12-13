import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, ThemeProvider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector'
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import CartButton from '../HeaderCartButton.js';
import { InventoryData } from '../data/inventory-data.js';

export default class CheckoutCompletePage extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ThemeProvider>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Swag Labs', style: { color: '#fff' } }}
          rightComponent={<CartButton navigation={this.props.navigation} />}
        />
      <Image source={require('../../img/peek.png')} style={styles.peek_img} />
      <View style={styles.secondary_header}>
        <Text style={styles.header_title}>Checkout Complete!</Text>
      </View>
      <ScrollView style={styles.container}>

        <View style={styles.complete_container}>
          <Text style={styles.complete_title}>THANK YOU FOR YOUR ORDER</Text>
          <Text style={styles.complete_text}>Your order has been dispatched, and will arrive just as fast as the pony can get there!</Text>
        </View>

        <Image resizeMode='contain' source={require('../../img/pony-express.jpg')} style={styles.ship_image} />

        <View style={styles.cart_footer}>
          <Button buttonStyle={styles.checkout_button} containerStyle={styles.checkout_button_container} onPress={() => {this.props.navigation.navigate('InventoryList');}} title="CONTINUE SHOPPING"/>
        </View>
      </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  secondary_header: {
    height: 80,

    backgroundColor: '#474c55',
    flexDirection: 'row'
  },
  complete_title: {
    fontSize: 24,
    fontWeight: '800',
    padding: 5
  },
  complete_text: {
    fontSize: 18,
    color: '#000',
    padding: 5
  },
  section_desc: {
    fontSize: 18,
    color: '#000',
    paddingTop: 3,
    left: 70
  },
  header_title: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 90,
    marginTop: 32
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  item_image: {
    width: 80,
    height: 100,
    flex: 1
  },
  peek_img: {
    width: 71,
    height: 70,
    top: 108,
    left: 5,
    position: 'absolute',
    zIndex: 10
  },
  item_container: {
    flexDirection: 'row',
    padding: 5
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 4,
    padding: 5
  },
  item_price_bar: {
    flexDirection: 'row',
    paddingTop: 5
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
    
  },
  item_quantity: {
    color: '#000',
    fontSize: 18,
    padding: 4
  },
  item_quantity_box: {
    borderWidth: 2,
    borderColor: '#000',
    width: 22,
    height: 35,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5
  },
  cart_footer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  checkout_button: {
    flex: 1,
  },
  ship_image: {
    width: '100%'
  },
  checkout_button_container: {
    marginTop: 10,
    marginBottom: 10
  },
});