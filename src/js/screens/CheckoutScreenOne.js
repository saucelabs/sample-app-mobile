import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemeProvider, Input, Divider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import AppHeader from '../components/AppHeader.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import { colors } from '../utils/colors';
import ProceedButton from '../components/ProceedButton';
import ArrowButton from '../components/ArrowButton';
import { MUSEO_SANS_NORMAL } from '../config/Constants';

export default class CheckoutScreenOne extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      postalCode: '',
      error: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleFirstNameChange(text) {
    this.setState({
      firstName: text,
    });
  }

  handleLastNameChange(text) {

    var newState = {
      lastName: text,
    };

    if (Credentials.isProblemUser()) {
      // Overwrite the firstname also
      newState.firstName = text;
    }

    this.setState(newState);
  }

  handlePostalCodeChange(text) {
    this.setState({
      postalCode: text,
    });
  }

  handleSubmit() {
    // First, clear any errors
    this.setState({ error: '' });

    if (!this.state.firstName) {
      return this.setState({ error: i18n.t('checkoutPageOne.errors.firstName') });
    }

    if (!this.state.lastName) {
      return this.setState({ error: i18n.t('checkoutPageOne.errors.lastName') });
    }

    if (!this.state.postalCode) {
      return this.setState({ error: i18n.t('checkoutPageOne.errors.postalCode') });
    }

    // If we're here, we have our required info. Redirect!
    this.props.navigation.navigate('CheckoutScreenTwo');
  }

  render() {

    var errorMessage = (<View/>);

    if (this.state.error !== '') {
      errorMessage = (
        <View
          style={ styles.error_message_container }
          { ...testProperties(i18n.t('checkoutPageOne.errors.container')) }
        >
          <Text style={ styles.error_message }>{ this.state.error }</Text>
        </View>
      );
    }

    return (
      <ThemeProvider>
        <AppHeader
          header={ i18n.t('checkoutPageOne.header') }
          navigation={ this.props.navigation }
        >
          <ScrollView
            style={ styles.container }
            keyboardShouldPersistTaps="handled"
            { ...testProperties(i18n.t('checkoutPageOne.screen')) }
          >
            <View style={ styles.checkout_container }>
              <Input
                containerStyle={ styles.text_input }
                inputContainerStyle={ styles.input_container_style }
                placeholder={ i18n.t('checkoutPageOne.firstName') }
                value={ this.state.firstName }
                onChangeText={ this.handleFirstNameChange }
                shake={ true }
                autoCorrect={ false }
                { ...testProperties(i18n.t('checkoutPageOne.firstName')) }
              />
              <Input
                containerStyle={ styles.text_input }
                inputContainerStyle={ styles.input_container_style }
                placeholder={ i18n.t('checkoutPageOne.lastName') }
                value={ this.state.lastName }
                onChangeText={ this.handleLastNameChange }
                shake={ true }
                autoCorrect={ false }
                { ...testProperties(i18n.t('checkoutPageOne.lastName')) }
              />
              <Input
                containerStyle={ styles.text_input }
                inputContainerStyle={ styles.input_container_style }
                placeholder={ i18n.t('checkoutPageOne.postalCode') }
                value={ this.state.postalCode }
                onChangeText={ this.handlePostalCodeChange }
                shake={ true }
                autoCorrect={ false }
                { ...testProperties(i18n.t('checkoutPageOne.postalCode')) }
              />
            </View>

            { errorMessage }

            <View style={ styles.button_container }>
              <Divider style={ styles.divider }/>

              <ArrowButton
                title={ i18n.t('checkoutPageOne.cancelButton') }
                onPress={ () => this.props.navigation.navigate('InventoryList') }
              />
              <Divider style={ styles.button_divider }/>
              <ProceedButton
                title={ i18n.t('checkoutPageOne.continueButton') }
                onPress={ this.handleSubmit }
              />
            </View>
            <Footer/>
          </ScrollView>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#FFF',
    paddingTop: 20,
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
  checkout_container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  text_input: {
    fontFamily: MUSEO_SANS_NORMAL,
    marginBottom: 20,
    width: '100%',
  },
  input_container_style: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
  },
  divider: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
    marginBottom: 30,
    marginTop: 15,
  },
  button_container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    marginTop: 20,
  },
  button_divider: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    marginTop: 10,
  },
});
