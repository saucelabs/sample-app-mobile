import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { InventoryData } from '../data/inventory-data.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import InventoryListItem from '../components/InventoryListItem';
import toggleRow from '../../img/toggle-row.png';
import toggleGrid from '../../img/toggle-grid.png';
import SecondaryHeader from '../components/SecondaryHeader';

export default class InventoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventoryList: InventoryData.ITEMS_NAME_AZ,
      sortState: 'az',
      menuOpen: false,
      gridView: true,
    };

    this.changeSort = this.changeSort.bind(this);
    this.sortNameAZ = this.sortNameAZ.bind(this);
    this.sortNameZA = this.sortNameZA.bind(this);
    this.sortPriceLoHi = this.sortPriceLoHi.bind(this);
    this.sortPriceHiLo = this.sortPriceHiLo.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
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
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleState() {
    this.setState({ gridView: !this.state.gridView });
  }

  toggleImage() {
    return (
      <Image
        style={ styles.toggle_image }
        resizeMode="contain"
        source={ this.state.gridView ? toggleRow : toggleGrid }
      />
    );
  }

  keyExtractor = item => item.name;

  render() {
    const sortOptions = [
      { key: 'sectionLabel', section: true, label: i18n.t('modalSelector.sectionLabel') },
      { key: 'az', label: i18n.t('modalSelector.azLabel') },
      { key: 'za', label: i18n.t('modalSelector.zaLabel') },
      { key: 'lohi', label: i18n.t('modalSelector.loHiLabel') },
      { key: 'hilo', label: i18n.t('modalSelector.hiLoLabel') },
    ];
    const headerButtons = (
      <View style={ styles.component_container }>
        <TouchableOpacity
          style={ styles.toggle }
          { ...testProperties(i18n.t('inventoryListPage.toggle')) }
          onPress={ this.toggleState }
        >
          { this.toggleImage() }
        </TouchableOpacity>
        <View { ...testProperties(i18n.t('modalSelector.button')) }>
          <ModalSelector
            data={ sortOptions }
            style={ styles.selector }
            selectTextStyle={ styles.selector_text }
            onChange={ (sortOption) => this.changeSort(sortOption.key) }
            cancelText={ i18n.t('modalSelector.cancel') }
            listItemAccessible
            cancelButtonAccessible
            openButtonContainerAccessible
            scrollViewAccessibilityLabel={ i18n.t('modalSelector.container') }
          >
            <Image
              style={ styles.selector_image }
              resizeMode="contain"
              source={ require('../../img/filter-button.png') }
            />
          </ModalSelector>
        </View>
      </View>
    );

    return (
      <ThemeProvider>
        <SecondaryHeader
          header={ i18n.t('inventoryListPage.header') }
          component={ headerButtons }
        />
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(i18n.t('inventoryListPage.screen')) }
        >
          <FlatList
            data={ this.state.inventoryList }
            keyExtractor={ this.keyExtractor }
            key={ (this.state.gridView) ? 1 : 0 }
            numColumns={ this.state.gridView ? 2 : 1 }
            renderItem={ ({ item, index }) =>
              <InventoryListItem
                key={ item.id }
                id={ item.id }
                image_url={ item.image_url }
                name={ item.name }
                desc={ item.desc }
                price={ item.price }
                navigation={ this.props.navigation }
                index={ index }
                gridView={ this.state.gridView }
              />
            }
          />
          <Footer/>
        </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  component_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  toggle: {
    marginRight: 10,
  },
  toggle_image: {
    height: 40,
    width: 40,
  },
  selector: {
    height: 40,
  },
  selector_text: {
    color: '#FFF',
  },
  selector_image: {
    backgroundColor: colors.white,
    height: 40,
    width: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
