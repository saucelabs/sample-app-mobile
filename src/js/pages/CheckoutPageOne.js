import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Credentials } from '../credentials.js';
import AppHeader from '../AppHeader.js';

export default class CheckoutPageOne extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      postalCode: '',
      error: ''
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
  };

  handleLastNameChange(text) {
    
    var newState = {
      lastName: text,
    };

    if (Credentials.isProblemUser()) {
      // Overwrite the firstname also
      newState.firstName = text;
    }

    this.setState(newState);
  };

  handlePostalCodeChange(text) {
    this.setState({
      postalCode: text,
    });
  };

  handleSubmit() {
    // First, clear any errors
    this.setState({ error: '' });

    if (!this.state.firstName) {
      return this.setState({ error: 'First Name is required' });
    }

    if (!this.state.lastName) {
      return this.setState({ error: 'Last Name is required' });
    }

    if (!this.state.postalCode) {
      return this.setState({ error: 'Postal Code is required' });
    }

    // If we're here, we have our required info. Redirect!
    this.props.navigation.navigate('CheckoutPageTwo');      
  }

  render() {

    var errorMessage = (<View />);
    
    if (this.state.error != '') {
      errorMessage = (<View>
      <Icon onPress={this.dismissError} name='times-circle' size={24} color='red' />
      <Text style={styles.error_message}>Epic sadface: {this.state.error}</Text>
      </View>);
    }

    return (
      <ThemeProvider>
        <AppHeader navigation={this.props.navigation}>
          <Image source={require('../../img/peek.png')} style={styles.peek_img} />
          <View style={styles.secondary_header}>
            <Text style={styles.header_title}>Checkout: Your Info</Text>
          </View>
          <ScrollView style={styles.container}>
            <Input containerStyle={styles.text_input} placeholder='First Name' value={this.state.firstName}
              onChangeText={this.handleFirstNameChange} leftIcon={<Icon name='user' size={24} color='black' />}
              shake={true} autoFocus={true} autoCorrect={false} />
            <Input containerStyle={styles.text_input} placeholder='Last Name' value={this.state.lastName}
              onChangeText={this.handleLastNameChange} leftIcon={<Icon name='user' size={24} color='black' />}
              shake={true} autoCorrect={false} /> 
            <Input containerStyle={styles.text_input} placeholder='Zip/Postal Code' value={this.state.postalCode}
              onChangeText={this.handlePostalCodeChange} leftIcon={<Icon name='envelope' size={24} color='black' />}
              shake={true} autoCorrect={false} /> 
    
            {errorMessage}          
    
            <View style={styles.cart_footer}>
              <Button buttonStyle={styles.checkout_button} containerStyle={styles.checkout_button_container} onPress={this.handleSubmit} title="CONTINUE CHECKOUT"/>
              <Button buttonStyle={styles.cancel_button} containerStyle={styles.checkout_button_container} onPress={() => {this.props.navigation.navigate('InventoryList');}} title="CANCEL"/>
            </View>
          </ScrollView>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  secondary_header: {
    height: 80,

    backgroundColor: '#474c55',
    flexDirection: 'row'
  },
  header_title: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 90,
    marginTop: 32
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  peek_img: {
    width: 71,
    height: 70,
    top: 108,
    left: 5,
    position: 'absolute',
    zIndex: 10
  },
  cart_footer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  checkout_button: {
    flex: 1,
  },
  cancel_button: {
    flex: 1,
    backgroundColor: '#F00'
  },
  checkout_button_container: {
    marginTop: 10,
    marginBottom: 10
  },
  text_input: {
    marginBottom: 20
  },
  error_message: {
    fontSize: 18,
  }
});