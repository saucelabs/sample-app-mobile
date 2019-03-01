import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemeProvider, Divider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import i18n from '../config/i18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import { colors } from '../utils/colors';
import ProceedButton from '../components/ProceedButton';
import ArrowButton from '../components/ArrowButton';
import ErrorMessageContainer from '../components/ErrorMessageContainer';
import InputError from '../components/InputError';
import SecondaryHeader from '../components/SecondaryHeader';
import { SCREENS } from '../Router';

export default class CheckoutScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      postalCode: '',
      postalCodeError: false,
      error: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.setState({
      error: '',
      firstNameError: false,
      lastNameError: false,
      postalCodeError: false,
    });
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
    this.resetState();

    if (!this.state.firstName) {
      return this.setState({
        error: i18n.t('checkoutPageOne.errors.firstName'),
        firstNameError: true,
      });
    }

    if (!this.state.lastName) {
      return this.setState({
        error: i18n.t('checkoutPageOne.errors.lastName'),
        lastNameError: true,
      });
    }

    if (!this.state.postalCode) {
      return this.setState({
        error: i18n.t('checkoutPageOne.errors.postalCode'),
        postalCodeError: true,
      });
    }

    // If we're here, we have our required info. Redirect!
    this.props.navigation.navigate(SCREENS.CHECKOUT_SCREEN_TWO);
  }

  render() {

    return (
      <ThemeProvider>
        <SecondaryHeader header={ i18n.t('checkoutPageOne.header') }/>
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(i18n.t('checkoutPageOne.screen')) }
        >
          <View style={ styles.checkout_container }>
            <InputError
              placeholder={ 'checkoutPageOne.firstName' }
              value={ this.state.firstName }
              onChangeText={ this.handleFirstNameChange }
              error={ this.state.firstNameError }
            />
            <Divider style={ styles.bottomMargin20 }/>
            <InputError
              placeholder={ 'checkoutPageOne.lastName' }
              value={ this.state.lastName }
              onChangeText={ this.handleLastNameChange }
              error={ this.state.lastNameError }
            />
            <Divider style={ styles.bottomMargin20 }/>
            <InputError
              placeholder={ 'checkoutPageOne.postalCode' }
              value={ this.state.postalCode }
              onChangeText={ this.handlePostalCodeChange }
              error={ this.state.postalCodeError }
            />
            <ErrorMessageContainer
              testID={ i18n.t('checkoutPageOne.errors.container') }
              message={ this.state.error }
            />
          </View>
          <View style={ styles.button_container }>
            <Divider style={ styles.divider }/>

            <ArrowButton
              title={ i18n.t('checkoutPageOne.cancelButton') }
              onPress={ () => this.props.navigation.navigate(SCREENS.INVENTORY_LIST) }
            />
            <Divider style={ styles.button_divider }/>
            <ProceedButton
              title={ i18n.t('checkoutPageOne.continueButton') }
              onPress={ this.handleSubmit }
            />
          </View>
          <Footer/>
        </ScrollView>
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
  checkout_container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  bottomMargin20: {
    marginBottom: 20,
  },
  divider: {
    borderColor: colors.lightGray,
    borderBottomWidth: 3,
    marginBottom: 30,
    marginTop: 3,
  },
  button_container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
  },
  button_divider: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    marginTop: 10,
  },
});
