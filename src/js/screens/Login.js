import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import SyncStorage from 'sync-storage';
import { ShoppingCart } from '../shopping-cart.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL } from '../config/Constants';
import { ParseText } from '../utils/parseText';
import { colors } from '../utils/colors';
import { STATUS_BAR_HEIGHT } from '../components/StatusBar';
import ActionButton from '../components/ActionButton';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  async componentWillMount() {
    // This is the first page loaded, so init our storage here
    await SyncStorage.init();
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleUserChange(text) {
    this.setState({
      username: text,
    });
  }

  handlePassChange(text) {
    this.setState({
      password: text,
    });
  }

  handleSubmit() {
    // First, clear any errors
    this.setState({ error: '' });

    if (!this.state.username) {
      return this.setState({ error: i18n.t('login.errors.username') });
    }

    if (!this.state.password) {
      return this.setState({ error: i18n.t('login.errors.password') });
    }

    if (Credentials.verifyCredentials(this.state.username, this.state.password)) {
      // Catch our locked-out user and bail out
      const isLockedOutUser = Credentials.isLockedOutUser();

      if (isLockedOutUser) {
        return this.setState({ error: i18n.t('login.errors.lockedOut') });
      }

      // If we're here, we have a username and password. Redirect after we wipe out any previous shopping cart contents
      ShoppingCart.resetCart();
      this.props.navigation.navigate('InventoryList');
    } else {
      return this.setState({ error: i18n.t('login.errors.noMatch') });
    }
  }

  /**
   * Parse a string that holds a `__text__` markdown and transform it into a
   * string with bolds or normal text components
   *
   * @param {string} string
   *
   * @return {*[]}
   */
  parseNormalBoldText(string) {
    return (ParseText(string).map(text => (
      <Text style={ [ text.bold ? styles.text_bold : {} ] }>
        { text.value }
      </Text>
    )));
  }

  render() {

    let errorMessage = (<View/>);

    if (this.state.error !== '') {
      errorMessage = (
        <View
          style={ styles.error_message_container }
          { ...testProperties(i18n.t('login.errors.container')) }
        >
          <Text style={ styles.error_message }>{ this.state.error }</Text>
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={ styles.scroll_container }
        keyboardShouldPersistTaps="handled"
        { ...testProperties(i18n.t('login.screen')) }
      >
        <View style={ styles.wrapper }>
          <View style={ styles.login_container }>
            <Image
              resizeMode="contain"
              source={ require('../../img/swag-labs-logo.png') }
              style={ styles.swag_logo_image }
            />
            <Input
              containerStyle={ styles.login_input }
              inputContainerStyle={ styles.input_container_style }
              placeholder={ i18n.t('login.username') }
              value={ this.state.username }
              onChangeText={ this.handleUserChange }
              shake={ true }
              autoCapitalize="none"
              autoCorrect={ false }
              { ...testProperties(i18n.t('login.username')) }
            />
            <Input
              containerStyle={ styles.login_input }
              inputContainerStyle={ styles.input_container_style }
              placeholder={ i18n.t('login.password') }
              value={ this.state.password }
              onChangeText={ this.handlePassChange }
              shake={ true }
              secureTextEntry={ true }
              { ...testProperties(i18n.t('login.password')) }
            />
            { errorMessage }
            <ActionButton
              onPress={ this.handleSubmit }
              title={ i18n.t('login.loginButton') }
            />
            <Image
              source={ require('../../img/login-bot.png') }
              style={ styles.login_bot_image }
              resizeMode="contain"
            />
          </View>
          <View style={ styles.login_info_container }>
            <Text style={ styles.login_info }>
              { this.parseNormalBoldText(i18n.t('login.loginText.usernames')) }
            </Text>
            <Divider style={ styles.divider }/>
            <Text style={ styles.login_info }>
              { this.parseNormalBoldText(i18n.t('login.loginText.password')) }
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: colors.white,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  wrapper: {
    flex: 1,
  },
  login_container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  swag_logo_image: {
    marginBottom: 30,
    width: '100%',
  },
  login_input: {
    fontFamily: MUSEO_SANS_NORMAL,
    marginBottom: 20,
    width: '100%',
  },
  input_container_style: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
  },
  error_message_container: {
    marginBottom: 20,
    marginTop: 20,
  },
  error_message: {
    color: colors.slRed,
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
    textAlign: 'center',
  },
  login_bot_image: {
    flex: 1,
    height: 320,
    width: '100%',
  },
  login_info_container: {
    backgroundColor: colors.superLightGray,
    paddingBottom: STATUS_BAR_HEIGHT,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },
  login_info: {
    color: colors.gray,
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
  },
  divider: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
    marginBottom: 20,
    marginTop: 20,
  },
  text_bold: {
    fontFamily: MUSEO_SANS_BOLD,
  },
});
