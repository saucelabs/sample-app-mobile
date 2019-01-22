import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button, Divider, Input } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import SyncStorage from 'sync-storage';
import { ShoppingCart } from '../shopping-cart.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import { IS_IOS, IS_IPHONEX, MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL } from '../config/Constants';
import { parseText } from '../utils/parseText';

export default class LoginPage extends Component {

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
    const data = await SyncStorage.init();
    console.log('AsyncStorage is ready!', data);
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

  render() {

    var errorMessage = (<View/>);

    if (this.state.error !== '') {
      errorMessage = (<View
        style={ styles.errorMessageContainer }
        { ...testProperties(i18n.t('login.errors.container')) }
      >
        <Text style={ styles.error_message }>{ this.state.error }</Text>
      </View>);
    }

    return (
      <ScrollView
        contentContainerStyle={ styles.scrollContainer }
        keyboardShouldPersistTaps="handled"
        { ...testProperties(i18n.t('login.screen')) }
      >
        <View style={ styles.wrapper }>
          <View style={ styles.loginContainer }>
            <Image
              resizeMode="contain"
              source={ require('../../img/swag.labs.logo.png') }
              style={ styles.swagLogo }
            />
            <Input
              containerStyle={ styles.login_input }
              inputContainerStyle={ styles.inputContainerStyle }
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
              inputContainerStyle={ styles.inputContainerStyle }
              placeholder={ i18n.t('login.password') }
              value={ this.state.password }
              onChangeText={ this.handlePassChange }
              shake={ true }
              secureTextEntry={ true }
              { ...testProperties(i18n.t('login.password')) }
            />
            { errorMessage }
            <Button
              buttonStyle={ styles.buttonStyle }
              containerStyle={ styles.buttonContainerStyle }
              titleStyle={ styles.buttonTitleStyle }
              onPress={ this.handleSubmit }
              title={ i18n.t('login.loginButton') }
              { ...testProperties(i18n.t('login.loginButton')) }
            />
            <Image
              source={ require('../../img/login.bot.png') }
              style={ styles.loginBot }
              resizeMode="contain"
            />
          </View>
          <View style={ styles.loginInfoContainer }>
            <Text style={ styles.login_info }>
              { parseText(i18n.t('login.loginText.usernames')).map(text => (
                <Text
                  style={ [ text.type === 'strong' ? styles.textBold : styles.text ] }
                >
                  { text.value }
                </Text>
              )) }
            </Text>
            <Divider style={ styles.divider }/>
            <Text style={ styles.login_info }>
              { parseText(i18n.t('login.loginText.password')).map(text => (
                <Text
                  style={ [ text.type === 'strong' ? styles.textBold : styles.text ] }
                >
                  { text.value }
                </Text>
              )) }
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    paddingTop: IS_IOS ? (IS_IPHONEX ? 44 : 20) : (StatusBar.currentHeight || 0),
  },
  wrapper: {
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  swagLogo: {
    marginBottom: 30,
    width: '100%',
  },
  login_input: {
    fontFamily: MUSEO_SANS_NORMAL,
    marginBottom: 20,
    width: '100%',
  },
  inputContainerStyle: {
    borderColor: '#EDEDEF',
    borderBottomWidth: 2,
  },
  buttonContainerStyle: {
    marginTop: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderColor: '#E2231A',
    borderWidth: 2,
    borderRadius: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },
  buttonTitleStyle: {
    color: '#E2231A',
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
  },
  errorMessageContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  error_message: {
    color: '#E2231A',
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
    textAlign: 'center',
  },
  loginBot: {
    flex: 1,
    height: 320,
    width: '100%',
  },
  loginInfoContainer: {
    backgroundColor: 'rgba(237,237,239,0.6)',
    paddingBottom: IS_IPHONEX ? 44 : 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },
  login_info: {
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
  },
  divider: {
    borderColor: '#EDEDEF',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    color: '#474C55',
  },
  textBold: {
    color: '#474C55',
    fontFamily: MUSEO_SANS_BOLD,
  },
});
