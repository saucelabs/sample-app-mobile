import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import { InventoryData } from '../data/inventory-data.js';
import AppHeader from '../AppHeader.js';
import { IS_IOS, MAKE_ACCESSIBLE_FOR_AUTOMATION } from '../config/Constants';
import i18n from '../config/i18n';
import {testProperties} from '../config/TestProperties';

class InventoryListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      image_url: props.image_url,
      name: props.name,
      desc: props.desc,
      price: props.price,
      // Set our initial state now
      itemInCart: ShoppingCart.isItemInCart(props.id),
    };

    ShoppingCart.registerCartListener(this);

    if (Credentials.isProblemUser()) {
      // Replace our image with our broken link image
      this.state.image_url = require('../../img/sl-404.jpg');
    }

    // Need to pass this in explicitly since it's a subcomponent
    this.navigation = props.navigation;

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.navigateToItem = this.navigateToItem.bind(this);
  }

  addToCart() {

    if (Credentials.isProblemUser()) {
      // Bail out now, don't add to cart if the item ID is odd
      if (this.state.id % 2 === 1) {
        return;
      }
    }

    ShoppingCart.addItem(this.state.id);
    this.setState({itemInCart: true});
  }

  removeFromCart() {

    if (Credentials.isProblemUser()) {
      // Bail out now, don't remove from cart if the item ID is even
      if (this.state.id % 2 === 0) {
        return;
      }
    }

    ShoppingCart.removeItem(this.state.id);
    this.setState({itemInCart: false});
  }

  navigateToItem() {

    var itemId = this.state.id;
    if (Credentials.isProblemUser()) {
      itemId += 1;
    }

    this.navigation.navigate('InventoryItem', {id: itemId});
  }

  render () {

    var cartButton;

    if (ShoppingCart.isItemInCart(this.state.id)) {
      cartButton = <Button containerStyle={styles.item_cart_button} titleStyle={ styles.upperCaseText } onPress={this.removeFromCart}
                           title={i18n.t('inventoryItemPage.removeButton')} {...testProperties(i18n.t('inventoryListPage.removeButton'))}/>;
    } else {
      cartButton = <Button containerStyle={styles.item_cart_button} titleStyle={ styles.upperCaseText } onPress={this.addToCart}
                           title={i18n.t('inventoryItemPage.addButton')} {...testProperties(i18n.t('inventoryListPage.addButton'))}/>;
    }
    // Needed to add `accessible={false}` to the TouchableOpacity component, otherwise the components are not accessible and shown
    // in a flat UI structure
    return (
      <View style={styles.item_container} {...testProperties(i18n.t('inventoryListPage.itemContainer'))}>
        <Image source={this.state.image_url} style={styles.item_image} />
        <TouchableOpacity style={styles.item_infobox} onPress={this.navigateToItem} {...MAKE_ACCESSIBLE_FOR_AUTOMATION}>
          <View style={styles.item_details} {...testProperties(i18n.t('inventoryListPage.itemDescription'))}>
            <Text style={styles.item_name}>{this.state.name}</Text>
            <Text style={styles.item_desc}>{this.state.desc}</Text>
          </View>
          <View style={styles.item_price_bar}>
            <Text style={styles.price_text} {...testProperties(i18n.t('inventoryListPage.price'))}>${this.state.price}</Text>
            { cartButton }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class InventoryListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventoryList: InventoryData.ITEMS_NAME_AZ,
      sortState: 'az',
      menuOpen: false,
    };

    this.changeSort = this.changeSort.bind(this);
    this.sortNameAZ = this.sortNameAZ.bind(this);
    this.sortNameZA = this.sortNameZA.bind(this);
    this.sortPriceLoHi = this.sortPriceLoHi.bind(this);
    this.sortPriceHiLo = this.sortPriceHiLo.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  changeSort(sortType) {
    switch (sortType){
      case 'az':
        this.sortNameAZ();
        break;
      case 'za':
        this.sortNameZA();
        break;
      case 'lohi':
        this.sortPriceLoHi();
        break;
      case 'hilo':
        this.sortPriceHiLo();
        break;
      default:
        break;
    }
  }

  sortNameAZ() {
    this.setState({
      inventoryList: InventoryData.ITEMS_NAME_AZ,
      sortState: 'az',
    });
  }

  sortNameZA() {
    this.setState({
      inventoryList: InventoryData.ITEMS_NAME_ZA,
      sortState: 'za',
    });
  }

  sortPriceLoHi() {
    this.setState({
      inventoryList: InventoryData.ITEMS_PRICE_LOHI,
      sortState: 'lohi',
    });
  }

  sortPriceHiLo() {
    this.setState({
      inventoryList: InventoryData.ITEMS_PRICE_HILO,
      sortState: 'hilo',
    });
  }

  openMenu() {
    this.setState({
      menuOpen: true,
    });
  }

  closeMenu() {
    this.setState({
      menuOpen: false,
    });
  }

  render() {

    const sortOptions = [
      { key: 'sectionLabel', section: true, label: i18n.t('modalSelector.sectionLabel') },
      { key: 'az', label: i18n.t('modalSelector.azLabel')},
      { key: 'za', label: i18n.t('modalSelector.zaLabel')},
      { key: 'lohi', label: i18n.t('modalSelector.loHiLabel')},
      { key: 'hilo', label: i18n.t('modalSelector.hiLoLabel')},
    ];

    return (
      <ThemeProvider>
        <AppHeader navigation={this.props.navigation}>
          <Image source={require('../../img/peek.png')} style={styles.peek_img} />
          <View style={styles.secondary_header}>
            <Text style={styles.header_title}>Products</Text>
            <ModalSelector data={sortOptions} initValue={i18n.t('modalSelector.azLabel')}
                           style={styles.item_sort} selectTextStyle={styles.sort_text}
                           onChange={(sortOption) => this.changeSort(sortOption.key)}
                           cancelText={i18n.t('modalSelector.cancel')}
                           listItemAccessible
                           cancelButtonAccessible
                           openButtonContainerAccessible
                           scrollViewAccessibilityLabel={i18n.t('modalSelector.container')}/>
          </View>
          <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" {...testProperties(i18n.t('inventoryListPage.screen'))}>
            {this.state.inventoryList.map((item, i) => {
              return (<InventoryListItem key={item.id} id={item.id} image_url={item.image_url} name={item.name} desc={item.desc} price={item.price} navigation={this.props.navigation} />);
            })}
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
  item_image: {
    width: 80,
    height: 100,
    flex: 1,
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
  item_sort: {
    marginLeft: 15,
    width: 150,
    height: 40,
    top: 30,
  },
  sort_text: {
    color: '#FFF',
  },
  upperCaseText: {
    textTransform: 'uppercase',
  },
});
