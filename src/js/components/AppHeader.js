import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import CartButton from './HeaderCartButton.js';
import MenuButton from './MenuButton.js';
import Drawer from 'react-native-drawer';
import HeaderSwagLogo from './HeaderSwagLogo';
import { IS_IOS } from '../config/Constants';
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
          containerStyle={ styles.header_container }
          leftComponent={ <MenuButton openMenuHandler={ this.openMenu }/> }
          centerComponent={ <HeaderSwagLogo/> }
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
  header_container: {
    backgroundColor: colors.white,
    height: IS_IOS ? 90 : 60,
    paddingTop: STATUS_BAR_HEIGHT,
  },
});
