import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { IS_IOS, IS_IPHONEX } from '../config/Constants';
import { colors } from '../utils/colors';

// This determines the height of the status bar if we are having an iPhone X(S|R) Max with a notch
export const STATUS_BAR_HEIGHT = IS_IOS ? (IS_IPHONEX ? 44 : 20) : (StatusBar.currentHeight || 0);

export default class SwagLabsStatusBar extends Component {
  render() {
    if (IS_IOS) {
      return (
        <View style={ styles.status_bar }>
          <StatusBar translucent={ false }/>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  status_bar: {
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: STATUS_BAR_HEIGHT,
  },
});
