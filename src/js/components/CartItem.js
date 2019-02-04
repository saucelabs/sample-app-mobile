import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { ShoppingCart } from '../shopping-cart.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL } from '../config/Constants';
import RemoveButton from './RemoveButton';

export default class CartItem extends Component {
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

    this.showRemoveButton = this.props.showRemoveButton;

    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart() {
    ShoppingCart.removeItem(this.item.id);
    this.setState({ itemVisible: false });
  }

  render() {
    if (this.state.itemVisible) {
      const removeButton = this.showRemoveButton ? (
        <RemoveButton
          onPress={ this.removeFromCart }
          title={ i18n.t('cartContent.cartItem.remove') }
        />
      ) : null;

      return (
        <View>
          <View style={ styles.item_container } { ...testProperties(i18n.t('cartContent.cartItem.itemContainer')) }>

            <View style={ styles.item_quantity_box } { ...testProperties(i18n.t('cartContent.cartItem.amount')) }>
              <Text style={ styles.item_quantity }>1</Text>
            </View>

            <View style={ styles.item_info_box }>
              <View style={ styles.item_details } { ...testProperties(i18n.t('cartContent.cartItem.description')) }>
                <Text style={ styles.item_name }>{ this.item.name }</Text>
                <Text style={ styles.item_desc }>{ this.item.desc }</Text>
              </View>
              <Divider style={ [ styles.divider, styles.description_price_divider ] }/>
              <View { ...testProperties(i18n.t('cartContent.cartItem.price')) }>
                <Text style={ styles.price_text }>${ this.item.price }</Text>
                { removeButton }
              </View>
            </View>

          </View>
          <Divider style={ styles.divider }/>
        </View>
      );
    }

    return (<View/>);
  }
}

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 15,
  },
  item_quantity_box: {
    borderWidth: 2,
    borderColor: colors.lightGray,
    width: 35,
    height: 35,
  },
  item_quantity: {
    color: colors.gray,
    fontFamily: MUSEO_SANS_NORMAL,
    fontSize: 24,
    textAlign: 'center',
  },
  item_info_box: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 25,
  },
  price_text: {
    color: colors.slRed,
    fontSize: 28,
    fontFamily: MUSEO_SANS_NORMAL,
    paddingBottom: 20,
  },
  item_cart_button: {
    flex: 3,
    backgroundColor: '#57c1e8',
  },
  item_details: {
    flexDirection: 'column',
  },
  item_name: {
    color: colors.slRed,
    fontSize: 20,
    fontFamily: MUSEO_SANS_BOLD,
    paddingBottom: 10,
  },
  item_desc: {
    color: colors.gray,
    fontSize: 16,
    fontFamily: MUSEO_SANS_NORMAL,
  },
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: 10,
    marginTop: 15,
  },
  description_price_divider: {
    width: '40%',
    marginBottom: 30,
    marginTop: 30,
  },
});
