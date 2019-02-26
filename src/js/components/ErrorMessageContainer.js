import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { MUSEO_SANS_NORMAL } from '../config/Constants';
import { testProperties } from '../config/TestProperties';

export default class ErrorMessageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {message, testID} = this.props;

    if (message === '') {
      return <View style={ styles.message_container }/>;
    }

    return (
      <View
        style={ [ styles.message_container, styles.error_message_container ] }
        { ...testProperties(testID) }
      >
        <Text style={ styles.error_message }>{ message }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message_container: {
    width: '100%',
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 2,
    marginTop: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_message_container: {
    backgroundColor: colors.slRed,
  },
  error_message: {
    color: colors.white,
    fontSize: 14,
    fontFamily: MUSEO_SANS_NORMAL,
    textAlign: 'center',
  },
});
