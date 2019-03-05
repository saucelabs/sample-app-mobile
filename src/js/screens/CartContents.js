import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Divider, ThemeProvider } from 'react-native-elements';
import { ShoppingCart } from '../shopping-cart.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { colors } from '../utils/colors';
import ArrowButton from '../components/ArrowButton';
import ProceedButton from '../components/ProceedButton';
import SectionHeader from '../components/SectionHeader';
import SecondaryHeader from '../components/SecondaryHeader';
import { SCREENS } from '../Router';

export default class CartContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const contents = ShoppingCart.getCartContents();

    return (
      <ThemeProvider>
        <SecondaryHeader header={ i18n.t('cartContent.header') }/>
        <SectionHeader/>
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(i18n.t('cartContent.screen')) }
        >
          <View style={ styles.cart_item_container }>
            { contents.map((item, i) => <CartItem key={ i } item={ InventoryData.ITEMS[ item ] } showRemoveButton/>) }
          </View>
          <View style={ styles.button_container }>
            <ArrowButton
              title={ i18n.t('cartContent.continueShopping') }
              onPress={ () => this.props.navigation.navigate(SCREENS.INVENTORY_LIST) }
            />
            <Divider style={ styles.button_divider }/>
            <ProceedButton
              title={ i18n.t('cartContent.checkout') }
              onPress={ () => this.props.navigation.navigate(SCREENS.CHECKOUT_SCREEN_ONE) }
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
