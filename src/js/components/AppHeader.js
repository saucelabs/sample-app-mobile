import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import CartButton from './HeaderCartButton.js';
import MenuButton from './MenuButton.js';
import HeaderSwagLogo from './HeaderSwagLogo';
import { IS_IOS, MUSEO_SANS_BOLD } from '../config/Constants';
import { colors } from '../utils/colors';
import { STATUS_BAR_HEIGHT } from './StatusBar';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header
        containerStyle={ styles.header_container }
        leftComponent={ <MenuButton navigation={ this.props.navigation }/> }
        centerComponent={ <HeaderSwagLogo/> }
        rightComponent={ <CartButton navigation={ this.props.navigation }/> }
      />
    );
  }
}

const styles = StyleSheet.create({
  header_container: {
    backgroundColor: colors.white,
    // Add the height if the statusbar for iOS to the height of the header container
    height: 60 + (IS_IOS ? STATUS_BAR_HEIGHT : 0),
    // for iOS the elements can be behind the statusbar, that's why there is a padding
    paddingTop: IS_IOS ? STATUS_BAR_HEIGHT : 0,
    paddingBottom: IS_IOS ? 0 : 10,
  },
  secondary_header: {
    height: 65,
    backgroundColor: colors.gray,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_border: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  header_title: {
    fontSize: 22,
    fontFamily: MUSEO_SANS_BOLD,
    color: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
