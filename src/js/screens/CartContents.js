import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, ThemeProvider } from 'react-native-elements';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../components/AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { MUSEO_SANS_NORMAL } from '../config/Constants';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { colors } from '../utils/colors';
import ArrowButton from '../components/ArrowButton';
import ProceedButton from '../components/ProceedButton';

export default class CartContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var contents = ShoppingCart.getCartContents();

    return (
      <ThemeProvider>
        <AppHeader
          navigation={ this.props.navigation }
          header={ i18n.t('cartContent.header') }
        >
          <View style={ styles.section_header }>
            <View style={ styles.section_header_container }>
              <Text style={ styles.section_qty }>{ i18n.t('cartContent.quantity') }</Text>
              <Text style={ styles.section_desc }>{ i18n.t('cartContent.description') }</Text>
            </View>
            <Divider style={ styles.divider }/>
          </View>
          <ScrollView
            style={ styles.container }
            keyboardShouldPersistTaps="handled"
            { ...testProperties(i18n.t('cartContent.screen')) }
          >
            <View style={ styles.cart_item_container }>
              { contents.map((item, i) => <CartItem key={ i } item={ InventoryData.ITEMS[ item ] }/>) }
            </View>
            <View style={ styles.button_container }>
              <ArrowButton
                title={ i18n.t('cartContent.continueShopping') }
                onPress={ () => this.props.navigation.navigate('InventoryList') }
              />
              <Divider style={styles.button_divider}/>
              <ProceedButton
                title={ i18n.t('cartContent.checkout') }
                onPress={ () => this.props.navigation.navigate('CheckoutScreenOne') }
              />
            </View>
            <Footer/>
          </ScrollView>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  section_header: {
    backgroundColor: colors.white,
    padding: 10,
  },
  section_header_container: {
    flexDirection: 'row',
  },
  section_qty: {
    color: colors.gray,
    fontFamily: MUSEO_SANS_NORMAL,
    fontSize: 18,
    paddingTop: 3,
  },
  section_desc: {
    fontSize: 18,
    color: colors.gray,
    paddingTop: 3,
    left: 70,
  },
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: 10,
    marginTop: 15,
  },
  container: {
    backgroundColor: colors.white,
  },
  cart_item_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  button_container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  button_divider:{
    backgroundColor: colors.white,
    borderTopWidth:0,
    borderBottomWidth: 0,
    marginBottom: 10,
    marginTop: 10,
  },
});
