import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';

export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, title } = this.props;
    return (
      <Button
        buttonStyle={ [ styles.button_style ] }
        containerStyle={ styles.button_container_style }
        titleStyle={ [ styles.button_title_style, styles.remove_button_title_style ] }
        onPress={ onPress }
        title={ title }
        { ...testProperties(title) }
      />
    );
  }
}

const styles = StyleSheet.create({
  button_container_style: {
    width: '100%',
  },
  button_style: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 3,
    borderRadius: 0,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 0,
  },
  button_title_style: {
    color: colors.gray,
    fontSize: 18,
    fontFamily: MUSEO_SANS_BOLD,
  },
  remove_button_style: {
    borderColor: colors.gray,
  },
});
