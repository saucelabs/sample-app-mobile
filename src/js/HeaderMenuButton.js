import React, { Component } from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Icon.Button name="bars" size={30} color="#FFF" style={styles.menu_icon} onPress={this.openMenu} />
    );
  }
}

const styles = StyleSheet.create({
  menu_icon: {
    height: Platform.OS === 'ios' ? 50 : 40,
    backgroundColor: '#2089DC'
  }
});