import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

export default class HeaderSwagLogo extends Component {
  render() {
    return (
      <Image
        style={ styles.header_image }
        resizeMode="contain"
        source={ require('../../img/swag-labs-logo.png') }
      />
    );
  }
}

const styles = StyleSheet.create({
  header_image: {
    height: 30,
    width: '100%',
  },
});
