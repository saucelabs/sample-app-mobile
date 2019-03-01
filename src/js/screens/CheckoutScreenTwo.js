import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, ThemeProvider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL } from '../config/Constants';
import ArrowButton from '../components/ArrowButton';
import ProceedButton from '../components/ProceedButton';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import CartItem from '../components/CartItem';
import SecondaryHeader from '../components/SecondaryHeader';
import { SCREENS } from '../Router';

export default class CheckoutScreenTwo extends Component {
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
    this.props.navigation.navigate(SCREENS.CHECKOUT_COMPLETE);
  }

  render() {
    const contents = ShoppingCart.getCartContents();
    let orderTotal = 0;

    for (const curItem in contents) {
      orderTotal = orderTotal + InventoryData.ITEMS[ contents[ curItem ] ].price;
      if (Credentials.isProblemUser()) {
        // double up for the problem user
        orderTotal = orderTotal + InventoryData.ITEMS[ contents[ curItem ] ].price;
      }
    }

    var orderTax = (orderTotal * 0.08).toFixed(2);

    return (
      <ThemeProvider>
        <SecondaryHeader header={ i18n.t('checkoutPageTwo.header') }/>
        <SectionHeader/>
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(i18n.t('checkoutPageTwo.screen')) }
        >
          <View style={ styles.cart_item_container }>
            { contents.map((item, i) => <CartItem key={ i } item={ InventoryData.ITEMS[ item ] }/>) }
          </View>

          <View style={ styles.summary_section }>
            <Text style={ styles.summary_info_label }>{ i18n.t('checkoutPageTwo.summary.paymentLabel') }</Text>
            <Text style={ styles.summary_value_label }>{ i18n.t('checkoutPageTwo.summary.card') }</Text>
            <Divider style={ styles.divider }/>
          </View>

          <View style={ styles.summary_section }>
            <Text style={ styles.summary_info_label }>{ i18n.t('checkoutPageTwo.summary.shippingLabel') }</Text>
            <Text style={ styles.summary_value_label }>{ i18n.t('checkoutPageTwo.summary.shippingText') }</Text>
            <Divider style={ styles.divider }/>
          </View>

          <View style={ styles.summary_section }>
            <Text style={ styles.summary_subtotal_label }>{ i18n.t('checkoutPageTwo.summary.itemsTotal') }${ orderTotal }</Text>
            <Text style={ styles.summary_tax_label }>{ i18n.t('checkoutPageTwo.summary.itemsTax') }${ orderTax }</Text>
            <Text style={ styles.summary_total_label }>
              { i18n.t('checkoutPageTwo.summary.totalAmount') }${ (orderTotal + parseFloat(orderTax)).toFixed(2) }
            </Text>
            <Divider style={ styles.divider }/>
          </View>

          <View style={ styles.button_container }>
            <ArrowButton
              title={ i18n.t('checkoutPageTwo.cancelButton') }
              onPress={ () => this.props.navigation.navigate(SCREENS.INVENTORY_LIST) }
            />
            <Divider style={ styles.button_divider }/>
            <ProceedButton
              title={ i18n.t('checkoutPageTwo.finishButton') }
              onPress={ this.clearCart }
            />
          </View>

          <Footer/>
        </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  cart_item_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  summary_section: {
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  summary_info_label: {
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
    paddingBottom: 5,
  },
  summary_value_label: {
    fontSize: 18,
    fontFamily: MUSEO_SANS_BOLD,
  },
  summary_subtotal_label: {
    fontSize: 18,
    padding: 4,
  },
  summary_tax_label: {
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
    padding: 4,
  },
  summary_total_label: {
    fontSize: 22,
    fontFamily: MUSEO_SANS_BOLD,
    padding: 4,
  },
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 25,
  },
  button_container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    marginTop: 20,
  },
  button_divider: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    marginTop: 10,
  },
});
