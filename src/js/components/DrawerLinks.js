import React, { Component } from 'react';
import i18n from '../config/i18n';
import { Credentials } from '../credentials';
import { Linking, StyleSheet, View } from 'react-native';
import { ShoppingCart } from '../shopping-cart';
import { Button, Divider } from 'react-native-elements';
import { testProperties } from '../config/TestProperties';

export default class DrawerLinks extends Component {

  constructor(props) {
    super(props);

    this.handleAllItemsLink = this.handleAllItemsLink.bind(this);
    this.handleAboutLink = this.handleAboutLink.bind(this);
    this.handleLogoutLink = this.handleLogoutLink.bind(this);
    this.handleResetLink = this.handleResetLink.bind(this);
  }

  handleAllItemsLink() {
    this.props.closeMenu();
    this.props.navigation.navigate('InventoryList');
  }

  handleAboutLink() {

    var aboutUrl = i18n.t('appHeader.url');
    if (Credentials.isProblemUser()) {
      aboutUrl = i18n.t('appHeader.404Url');
    }

    this.props.closeMenu();
    Linking.openURL(aboutUrl);
  }

  handleLogoutLink() {
    this.props.closeMenu();
    this.props.navigation.navigate('Login');
  }

  handleResetLink() {
    this.props.closeMenu();
    ShoppingCart.resetCart();
  }

  render() {

    return (
      <View style={ styles.container }>
        <Divider style={ styles.menu_header_divider }/>
        <Button
          containerStyle={ styles.menu_button }
          onPress={ this.handleAllItemsLink }
          title={ i18n.t('menu.allItems') }
          { ...testProperties(i18n.t('menu.allItems')) }
        />
        <Button
          containerStyle={ styles.menu_button }
          onPress={ this.handleAboutLink }
          title={ i18n.t('menu.about') }
          { ...testProperties(i18n.t('menu.about')) }
        />
        <Button
          containerStyle={ styles.menu_button }
          onPress={ this.handleLogoutLink }
          title={ i18n.t('menu.logout') }
          { ...testProperties(i18n.t('menu.logout')) }
        />
        <Button
          containerStyle={ styles.menu_button }
          onPress={ this.handleResetLink }
          title={ i18n.t('menu.reset') }
          { ...testProperties(i18n.t('menu.reset')) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  menu_button: {
    backgroundColor: '#FFF',
    margin: 10,
  },
  menu_header_divider: {
    height: 50,
    backgroundColor: '#FFF',
  },
});
