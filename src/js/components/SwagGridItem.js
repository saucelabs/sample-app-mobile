import React, { Component } from 'react';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  MAKE_ACCESSIBLE_FOR_AUTOMATION,
  MUSEO_SANS_BOLD,
  MUSEO_SANS_NORMAL,
  WINDOW_WIDTH,
} from '../config/Constants';
import { colors } from '../utils/colors';

export default class SwagGridItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cartButton;
    const { addToCart, id, index, image_url, name, navigateToItem, price, removeFromCart } = this.props;

    if (ShoppingCart.isItemInCart(id)) {
      cartButton = (
        <Button
          buttonStyle={ [ styles.button_style, styles.remove_button_style ] }
          titleStyle={ [ styles.button_title_style, styles.remove_button_title_style ] }
          onPress={ removeFromCart }
          title={ i18n.t('inventoryItemPage.removeButton') }
          { ...testProperties(i18n.t('inventoryListPage.removeButton')) }
        />);
    } else {
      cartButton = (
        <Button
          buttonStyle={ styles.button_style }
          titleStyle={ styles.button_title_style }
          onPress={ addToCart }
          title={ i18n.t('inventoryItemPage.addButton') }
          { ...testProperties(i18n.t('inventoryListPage.addButton')) }
        />);
    }

    return (
      <View
        // Add a margin to the right if it is the second element, so index number will be odd
        style={ [ styles.item_container, index % 2 === 0 ? {} : styles.item_container_margin_right ] }
        { ...testProperties(i18n.t('inventoryListPage.itemContainer')) }
      >
        <TouchableOpacity
          onPress={ navigateToItem }
          { ...MAKE_ACCESSIBLE_FOR_AUTOMATION }
          style={ styles.item_wrapper }
        >
          <View style={ styles.top_container }>
            <Image
              source={ image_url }
              style={ styles.item_image }
              resizeMode="contain"
            />

            <Text
              style={ styles.item_name }
              { ...testProperties(i18n.t('inventoryListPage.itemTitle')) }
            >{ name }</Text>
          </View>

          <View style={ styles.bottom_container }>
            <Divider style={ styles.divider }/>

            <Text style={ styles.price_text }{ ...testProperties(i18n.t('inventoryListPage.price')) }>
              ${ price }
            </Text>

            { cartButton }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  item_container_margin_right: {
    marginRight: 20,
  },
  item_wrapper: {
    flex: 1,
  },
  top_container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item_image: {
    flex: 1,
    // This is for keeping the aspect ratio and make it responsive
    height: ((WINDOW_WIDTH - 60) * 1.25) / 2,
    width: '100%',
    marginBottom: 20,
  },
  item_name: {
    color: colors.slRed,
    fontSize: 18,
    fontFamily: MUSEO_SANS_BOLD,
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    width: '40%',
    marginBottom: 10,
    marginTop: 20,
  },
  price_text: {
    color: colors.gray,
    fontSize: 22,
    fontFamily: MUSEO_SANS_NORMAL,
  },
  button_style: {
    backgroundColor: colors.white,
    borderColor: colors.slRed,
    borderWidth: 3,
    borderRadius: 0,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    elevation: 0,
  },
  button_title_style: {
    color: colors.slRed,
    fontSize: 16,
    fontFamily: MUSEO_SANS_BOLD,
  },
  remove_button_style: {
    borderColor: colors.gray,
  },
  remove_button_title_style: {
    color: colors.gray,
  },
});
