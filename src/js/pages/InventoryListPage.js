import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { InventoryData } from '../data/inventory-data.js';
import AppHeader from '../components/AppHeader.js';
import { IS_IOS } from '../config/Constants';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import InventoryListItem from '../components/InventoryListItem';

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
    switch (sortType) {
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
      { key: 'az', label: i18n.t('modalSelector.azLabel') },
      { key: 'za', label: i18n.t('modalSelector.zaLabel') },
      { key: 'lohi', label: i18n.t('modalSelector.loHiLabel') },
      { key: 'hilo', label: i18n.t('modalSelector.hiLoLabel') },
    ];

    return (
      <ThemeProvider>
        <AppHeader navigation={ this.props.navigation }>
          <View style={ styles.secondary_header }>
            <Text style={ styles.header_title }>Products</Text>
            <View { ...testProperties(i18n.t('modalSelector.button')) }>
              <ModalSelector
                data={ sortOptions }
                initValue={ i18n.t('modalSelector.azLabel') }
                style={ styles.item_sort }
                selectTextStyle={ styles.sort_text }
                onChange={ (sortOption) => this.changeSort(sortOption.key) }
                cancelText={ i18n.t('modalSelector.cancel') }
                listItemAccessible
                cancelButtonAccessible
                openButtonContainerAccessible
                scrollViewAccessibilityLabel={ i18n.t('modalSelector.container') }
              />
            </View>
          </View>
          <ScrollView
            style={ styles.container }
            keyboardShouldPersistTaps="handled"
            { ...testProperties(i18n.t('inventoryListPage.screen')) }
          >
            { this.state.inventoryList.map((item, i) => {
              return (
                <InventoryListItem
                  key={ item.id }
                  id={ item.id }
                  image_url={ item.image_url }
                  name={ item.name }
                  desc={ item.desc }
                  price={ item.price }
                  navigation={ this.props.navigation }
                />);
            }) }
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
  peek_img: {
    width: 71,
    height: 70,
    top: IS_IOS ? 100 : 80,
    left: 5,
    position: 'absolute',
    zIndex: 10,
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 4,
    padding: 5,
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
});
