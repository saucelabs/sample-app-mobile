import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemeProvider, Divider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import { colors } from '../utils/colors';
import ProceedButton from '../components/ProceedButton';
import ArrowButton from '../components/ArrowButton';
import ErrorMessageContainer from '../components/ErrorMessageContainer';
import InputError from '../components/InputError';
import SecondaryHeader from '../components/SecondaryHeader';
import { ShoppingCart } from '../shopping-cart';
import { SCREENS } from '../config/Constants';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import TestFairy from 'react-native-testfairy';

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

    // If provided through deeplink, add the items to the cart
    ShoppingCart.addDeeplinkItems(this.props.navigation.getParam('ids', ''));
  }

  componentDidMount() {
    handleQuickActionsNavigation(this.props.navigation);
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

    // We set an attribute every time this field changes so we can see these details directly on JIRA when a feedback is submitted
    TestFairy.setAttribute("firstName", text);
  }

  handleLastNameChange(text) {
    const newState = {
      lastName: text,
    };

    if (Credentials.isProblemUser()) {
      // Overwrite the firstname also
      newState.firstName = text;

      // We set an attribute every time this field changes so we can see these details directly on JIRA when a feedback is submitted
      TestFairy.setAttribute("lastName", text);
    } else {
      // We set an attribute every time this field changes so we can see these details directly on JIRA when a feedback is submitted
      TestFairy.setAttribute("lastName", "");
    }

    this.setState(newState);
  }

  handlePostalCodeChange(text) {
    this.setState({
      postalCode: text,
    });

    // We set an attribute every time this field changes so we can see these details directly on JIRA when a feedback is submitted
    TestFairy.setAttribute("postalCode", text);
  }

  handleSubmit() {
    // First, clear any errors
    this.resetState();

    if (!this.state.firstName) {
      return this.setState({
        error: I18n.t('checkoutPageOne.errors.firstName'),
        firstNameError: true,
      });
    }

    if (!this.state.lastName) {
      return this.setState({
        error: I18n.t('checkoutPageOne.errors.lastName'),
        lastNameError: true,
      });
    }

    if (!this.state.postalCode) {
      return this.setState({
        error: I18n.t('checkoutPageOne.errors.postalCode'),
        postalCodeError: true,
      });
    }

    // If we're here, we have our required info. Redirect!
    this.props.navigation.navigate(SCREENS.CHECKOUT_SCREEN_TWO);
  }

  render() {

    return (
      <ThemeProvider>
        <SecondaryHeader header={ I18n.t('checkoutPageOne.header') }/>
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(I18n.t('checkoutPageOne.screen')) }
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
              testID={ I18n.t('checkoutPageOne.errors.container') }
              message={ this.state.error }
            />
          </View>
          <View style={ styles.button_container }>
            <Divider style={ styles.divider }/>

            <ArrowButton
              title={ I18n.t('checkoutPageOne.cancelButton') }
              onPress={ () => this.props.navigation.navigate(SCREENS.INVENTORY_LIST) }
            />
            <Divider style={ styles.button_divider }/>
            <ProceedButton
              title={ I18n.t('checkoutPageOne.continueButton') }
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
