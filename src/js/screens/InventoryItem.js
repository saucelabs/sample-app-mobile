import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import AppHeader from '../components/AppHeader.js';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';
import InventoryListItem from '../components/InventoryListItem';
import Footer from '../components/Footer';

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
        <AppHeader
          navigation={ this.props.navigation }
          component={
            <Button
              buttonStyle={ styles.back_button_style }
              containerStyle={ styles.back_button_container }
              titleStyle={ styles.back_button_title }
              onPress={ this.goBack }
              title={ i18n.t('inventoryItemPage.backButton') }
              icon={
                <Image
                  style={ styles.back_button_image }
                  source={ require('../../img/arrow-left.png') }
                /> }
              { ...testProperties(i18n.t('inventoryItemPage.backButton')) }
            />
          }
        >
          <ScrollView
            style={ styles.container }
            keyboardShouldPersistTaps="handled"
            { ...testProperties(i18n.t('inventoryItemPage.screen')) }
          >
            <InventoryListItem
              key={ this.item.id }
              id={ this.item.id }
              image_url={ this.item.image_url }
              name={ this.item.name }
              desc={ this.item.desc }
              price={ this.item.price }
              navigation={ this.props.navigation }
              disabled
            />
            <Footer/>
          </ScrollView>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
  back_button_container: {
    flex: 1,
    height: 40,
    marginTop: 14,
  },
  back_button_style: {
    borderRadius: 0,
    backgroundColor: colors.white,
  },
  back_button_title: {
    color: colors.gray,
    fontFamily: MUSEO_SANS_BOLD,
    fontSize: 20,
  },
  back_button_image: {
    position: 'absolute',
    top: 9,
    left: 10,
  },
});
