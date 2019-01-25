import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { testProperties } from '../config/TestProperties';
import { Button } from 'react-native-elements';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';

export default class ArrowButton extends Component {
  constructor(props) {
    super(props);

    // If provided no borders are shown
    this.noBorders = this.props.noBorders;
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
        icon={
          <Image
            style={ styles.button_image }
            source={ require('../../img/arrow-left.png') }
          /> }
        { ...testProperties(title) }
      />
    );
  }
}

const styles = StyleSheet.create({
  button_container: {
    flex: 1,
    height: 50,
    borderWidth: this.noBorders ? 0 : 2,
    borderColor: this.noBorders ? 'transparent' : colors.gray,
  },
  button_style: {
    borderRadius: 0,
    backgroundColor: colors.white,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 0,
  },
  button_title: {
    color: colors.gray,
    fontFamily: MUSEO_SANS_BOLD,
    fontSize: 18,
  },
  button_image: {
    position: 'absolute',
    top: 18,
    left: 10,
  },
});
