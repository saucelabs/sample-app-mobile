import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { IS_IOS, MUSEO_SANS_BOLD } from '../config/Constants';
import { STATUS_BAR_HEIGHT } from './StatusBar';

export default class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerText = this.props.header ? <Text style={ styles.header_title }>{ this.props.header }</Text> : null;
    const component = this.props.component || null;

    return (
      <View style={ [ styles.secondary_header, (!headerText && !component) ? styles.bottom_border : {} ] }>
        { headerText }
        { component }
      </View>
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
