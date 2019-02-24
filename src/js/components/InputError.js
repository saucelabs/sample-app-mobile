import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { MUSEO_SANS_NORMAL } from '../config/Constants';
import { colors } from '../utils/colors';

export default class InputError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onChangeText, value, placeholder, error, secureTextEntry } = this.props;

    return (
      <Input
        // Add the error layout if there is an error
        inputContainerStyle={ [ styles.input_container_style, error ? styles.input_container_error_style : {} ] }
        inputStyle={ [ styles.input, error ? styles.input_error : {} ] }
        rightIcon={
          error ?
            <Icon
              name="times-circle"
              type="font-awesome"
              size={ 18 }
              color={ colors.slRed }
            />
            : null
        }
        placeholderTextColor={ error ? colors.slRed : colors.gray }
        // The default props / styling
        containerStyle={ [ styles.login_input ] }
        placeholder={ i18n.t(placeholder) }
        value={ value }
        onChangeText={ onChangeText }
        shake={ true }
        autoCapitalize="none"
        autoCorrect={ false }
        secureTextEntry={ secureTextEntry }
        { ...testProperties(i18n.t(placeholder)) }
      />
    );
  }
}

const styles = StyleSheet.create({
  login_input: {
    fontFamily: MUSEO_SANS_NORMAL,
    width: '100%',
  },
  input_container_style: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
  },
  input_container_error_style: {
    borderColor: colors.slRed,
  },
  input: {
    marginLeft: 0,
    color: colors.gray,
  },
  input_error: {
    color: colors.slRed,
  },
});
