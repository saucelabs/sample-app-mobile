import React, { Component } from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {Header, Button, Divider} from 'react-native-elements';
import CartButton from './HeaderCartButton.js';
import MenuButton from './HeaderMenuButton.js';
import Drawer from 'react-native-drawer';
import { ShoppingCart } from './shopping-cart.js';
import { Credentials } from './credentials.js';
import { IS_IOS } from './config/Constants';
import i18n from './config/i18n';
import {testProperties} from './config/TestProperties';

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

  render () {

    return (
      <View style={styles.container}>
        <Divider style={styles.menu_header_divider}/>
        <Button containerStyle={styles.menu_button} titleStyle={ styles.upperCaseText } onPress={this.handleAllItemsLink}
                title={i18n.t('menu.allItems')} {...testProperties(i18n.t('menu.allItems'))}/>
        <Button containerStyle={styles.menu_button} titleStyle={ styles.upperCaseText } onPress={this.handleAboutLink}
                title={i18n.t('menu.about')} {...testProperties(i18n.t('menu.about'))}/>
        <Button containerStyle={styles.menu_button} titleStyle={ styles.upperCaseText } onPress={this.handleLogoutLink}
                title={i18n.t('menu.logout')} {...testProperties(i18n.t('menu.logout'))}/>
        <Button containerStyle={styles.menu_button} titleStyle={ styles.upperCaseText } onPress={this.handleResetLink}
                title={i18n.t('menu.reset')} {...testProperties(i18n.t('menu.reset'))}/>
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

  render () {

    return (
      <Drawer
        open={this.state.menuOpen}
        type="static"
        tapToClose={true}
        openDrawerOffset={0.5}
        closedDrawerOffset={0}
        content={<DrawerLinks navigation={this.props.navigation} closeMenu={this.closeMenu} />}
        styles={styles.container}
        tweenHandler={Drawer.tweenPresets.parallax}
        tweenEasing={'easeInOutQuad'}
        tweenDuration={400}
        onClose={this.closeMenu}
      >
        <Header
          containerStyle={styles.header_container}
          leftComponent={<MenuButton openMenuHandler={this.openMenu} />}
          centerComponent={{ text: i18n.t('appHeader.label'), style: { color: '#fff' } }}
          rightComponent={<CartButton navigation={this.props.navigation} />}
        />
        {this.props.children}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  header_container: {
    height: IS_IOS ? 80 : 60,
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
  upperCaseText: {
    textTransform: 'uppercase',
  },
});
