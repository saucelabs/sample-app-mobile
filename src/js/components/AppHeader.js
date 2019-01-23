import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import CartButton from './HeaderCartButton.js';
import MenuButton from './MenuButton.js';
import Drawer from 'react-native-drawer';
import HeaderSwagLogo from './HeaderSwagLogo';
import { IS_IOS, MUSEO_SANS_BOLD } from '../config/Constants';
import DrawerLinks from './DrawerLinks';
import { colors } from '../utils/colors';
import { STATUS_BAR_HEIGHT } from './StatusBar';

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
    const headerText = this.props.header ? <Text style={ styles.header_title }>{this.props.header}</Text> : null;
    const component = this.props.component || null;

    return (
      <Drawer
        open={ this.state.menuOpen }
        type="overlay"
        tapToClose={ true }
        closedDrawerOffset={ 0 }
        content={ <DrawerLinks navigation={ this.props.navigation } closeMenu={ this.closeMenu }/> }
        styles={ styles.container }
        onClose={ this.closeMenu }
      >
        <Header
          containerStyle={ styles.header_container }
          leftComponent={ <MenuButton openMenuHandler={ this.openMenu }/> }
          centerComponent={ <HeaderSwagLogo/> }
          rightComponent={ <CartButton navigation={ this.props.navigation }/> }
        />
        <View style={ styles.secondary_header }>
          {headerText}
          {component}
        </View>
        { this.props.children }
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header_container: {
    backgroundColor: colors.white,
    height: IS_IOS ? 90 : 60,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  secondary_header: {
    height: 65,
    backgroundColor: colors.gray,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header_title: {
    fontSize: 24,
    fontFamily: MUSEO_SANS_BOLD,
    color: colors.white,
    marginTop: 20,
  },
});
