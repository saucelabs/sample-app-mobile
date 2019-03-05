import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import InventoryListItemDetails from '../components/InventoryListItemDetails';
import Footer from '../components/Footer';
import ArrowButton from '../components/ArrowButton';
import SecondaryHeader from '../components/SecondaryHeader';
import { SCREENS } from '../Router';

export default class InventoryItem extends Component {
  constructor(props) {
    super(props);

    const inventoryId = this.props.navigation.getParam('id', -1);

    if ((inventoryId >= 0) && (InventoryData.ITEMS.length > inventoryId)) {
      this.item = InventoryData.ITEMS[ inventoryId ];
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
    this.props.navigation.navigate(SCREENS.INVENTORY_LIST);
  }

  addToCart() {
    if (Credentials.isProblemUser()) {
      // Bail out now, don't add to cart if the item ID is odd
      if (this.state.id % 2 === 1) {
        return;
      }
    }

    ShoppingCart.addItem(this.item.id);
    this.setState({ itemInCart: true });
  }

  removeFromCart() {
    if (Credentials.isProblemUser()) {
      // Bail out now, don't remove from cart if the item ID is even
      if (this.state.id % 2 === 0) {
        return;
      }
    }

    ShoppingCart.removeItem(this.item.id);
    this.setState({ itemInCart: false });
  }

  render() {
    return (
      <ThemeProvider>
        <SecondaryHeader
          component={
            <ArrowButton
              title={ i18n.t('inventoryItemPage.backButton') }
              onPress={ this.goBack }
              noBorders
            />
          }
        />
          <ScrollView
            style={ styles.container }
            keyboardShouldPersistTaps="handled"
            { ...testProperties(i18n.t('inventoryItemPage.screen')) }
          >
            <InventoryListItemDetails
              key={ this.item.id }
              id={ this.item.id }
              image_url={ this.item.image_url }
              name={ this.item.name }
              desc={ this.item.desc }
              price={ this.item.price }
              navigation={ this.props.navigation }
            />
            <Footer/>
          </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
});
