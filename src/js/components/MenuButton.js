import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { testProperties } from '../config/TestProperties';
import i18n from '../config/i18n';

export default class MenuButton extends Component {
  constructor(props) {
    super(props);

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    // Call a function provided by a parent component
    if (this.props.openMenuHandler) {
      this.props.openMenuHandler();
    }
  }

  render () {

    return (
      <View {...testProperties(i18n.t('menu.label'))}>
        <TouchableOpacity onPress={this.openMenu}>
          <Image
            style={styles.menu_image}
            resizeMode="contain"
            source={ require('../../img/menu-button.png') }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu_image: {
    height: 40,
    width: 40,
  },
});
