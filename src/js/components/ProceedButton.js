import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { testProperties } from '../config/TestProperties';
import { Button } from 'react-native-elements';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';

export default class ProceedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, title } = this.props;

    return (
      <Button
        buttonStyle={ styles.button_style }
        containerStyle={ styles.button_container }
        titleStyle={ styles.button_title }
        onPress={ onPress }
        title={ title }
        { ...testProperties(title) }
      />
    );
  }
}

const styles = StyleSheet.create({
  button_container: {
    flex: 1,
    height: 50,
  },
  button_style: {
    backgroundColor: colors.slRed,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 0,
  },
  button_title: {
    color: colors.white,
    fontFamily: MUSEO_SANS_BOLD,
    fontSize: 18,
  },
});
