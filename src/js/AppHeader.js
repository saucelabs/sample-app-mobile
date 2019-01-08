import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Header, Button, Divider } from 'react-native-elements';
import CartButton from './HeaderCartButton.js';
import MenuButton from './HeaderMenuButton.js';
import Drawer from 'react-native-drawer';
import { ShoppingCart } from './shopping-cart.js';
import { Credentials } from './credentials.js';

class DrawerLinks extends Component {

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

    var aboutUrl = 'https://saucelabs.com/';
    if (Credentials.isProblemUser()) {
      aboutUrl = 'https://saucelabs.com/error/404';
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
        <Button style={ styles.menu_button } onPress={ this.handleAllItemsLink } title="ALL ITEMS"/>
        <Button style={ styles.menu_button } onPress={ this.handleAboutLink } title="ABOUT"/>
        <Button style={ styles.menu_button } onPress={ this.handleLogoutLink } title="LOGOUT"/>
        <Button style={ styles.menu_button } onPress={ this.handleResetLink } title="RESET APP STATE"/>
      </View>
    );
  }
}

export default class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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

    return (
      <Drawer
        open={ this.state.menuOpen }
        type="static"
        tapToClose={ true }
        openDrawerOffset={ 0.5 }
        closedDrawerOffset={ 0 }
        content={ <DrawerLinks navigation={ this.props.navigation } closeMenu={ this.closeMenu }/> }
        styles={ styles.container }
        tweenHandler={ Drawer.tweenPresets.parallax }
        tweenEasing={ 'easeInOutQuad' }
        tweenDuration={ 400 }
        onClose={ this.closeMenu }
      >
        <Header
          leftComponent={ <MenuButton openMenuHandler={ this.openMenu }/> }
          centerComponent={ { text: 'Swag Labs', style: { color: '#fff' } } }
          rightComponent={ <CartButton navigation={ this.props.navigation }/> }
        />
        { this.props.children }
      </Drawer>
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
  menu_text: {
    color: '#000',
    fontWeight: '800',
  },
  menu_header_divider: {
    height: 50,
    backgroundColor: '#FFF',
  },
});
