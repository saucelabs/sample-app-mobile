import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, ThemeProvider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector'
import { Credentials } from '../credentials.js';
import { ShoppingCart } from '../shopping-cart.js';
import CartButton from '../HeaderCartButton.js';
import { InventoryData } from '../data/inventory-data.js';

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
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Swag Labs', style: { color: '#fff' } }}
          rightComponent={<CartButton navigation={this.props.navigation} />}
        />
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
  section_header: {
    height: 35,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 5
  },
  section_qty: {
    fontSize: 18,
    color: '#000',
    paddingTop: 3
  },
  section_desc: {
    fontSize: 18,
    color: '#000',
    paddingTop: 3,
    left: 70
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
  item_image: {
    width: 80,
    height: 100,
    flex: 1
  },
  peek_img: {
    width: 71,
    height: 70,
    top: 108,
    left: 5,
    position: 'absolute',
    zIndex: 10
  },
  item_container: {
    flexDirection: 'row',
    padding: 5
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 4,
    padding: 5
  },
  item_price_bar: {
    flexDirection: 'row',
    paddingTop: 5
  },
  item_cart_button: {
    flex: 3,
    backgroundColor: '#57c1e8'
  },
  item_details: {
    flexDirection: 'column'
  },
  price_text: {
    color: '#569210',
    fontSize: 18,
    flex: 2,
    paddingTop: 10
  },
  item_name: {
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 5
  },
  item_desc: {
    
  },
  item_quantity: {
    color: '#000',
    fontSize: 18,
    padding: 4
  },
  item_quantity_box: {
    borderWidth: 2,
    borderColor: '#000',
    width: 22,
    height: 35,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5
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