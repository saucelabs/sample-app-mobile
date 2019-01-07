import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, ThemeProvider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Credentials } from '../credentials.js';
import SyncStorage from 'sync-storage';
import { ShoppingCart } from '../shopping-cart.js';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
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
  };

  handlePassChange(text) {
    this.setState({
      password: text,
    });
  }

  handleSubmit() {
    // First, clear any errors
    this.setState({ error: '' });

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    if (Credentials.verifyCredentials(this.state.username, this.state.password)) {
      // Catch our locked-out user and bail out
      const isLockedOutUser = Credentials.isLockedOutUser();

      if (isLockedOutUser) {
        return this.setState({ error: 'Sorry, this user has been locked out.' });
      }

      // If we're here, we have a username and password. Redirect after we wipe out any previous shopping cart contents
      ShoppingCart.resetCart();
      this.props.navigation.navigate('InventoryList');
    } else {
      return this.setState({ error: 'Username and password do not match any user in this service' });
    }
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
          containerStyle={styles.header_container}
          centerComponent={{ text: 'Swag Labs', style: { color: '#fff' } }}
        />
      <View style={styles.container}>
        <Input containerStyle={styles.login_input} placeholder='Username' value={this.state.username}
               onChangeText={this.handleUserChange}
               leftIcon={<Icon name='user' size={24} color='black' />}
        shake={true} autoFocus={true} autoCapitalize='none' autoCorrect={false} /> 
        <Input containerStyle={styles.login_input} placeholder='Password' value={this.state.password}
               onChangeText={this.handlePassChange}
               leftIcon={<Icon name='lock' size={28} color='black' />}
        shake={true} secureTextEntry={true} /> 
        <Button onPress={this.handleSubmit} title="LOGIN"/>

        {errorMessage}          

        <Text style={styles.login_info}>The currently accepted usernames for this application are:{'\n'}
        {'\n'}
standard_user{'\n'}
locked_out_user{'\n'}
problem_user{'\n'}
{'\n'}
And the password for all users is:{'\n'}
{'\n'}
secret_sauce</Text>
      </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header_container: {
    height: Platform.OS === 'ios' ? 80 : 50,
  },
  login_input: {
    marginBottom: 20
  },
  login_info: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Courier New',
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderStyle: 'dashed',
    borderWidth: 4,
    borderColor: '#000000'    
  },
  error_message: {
    fontSize: 18,
  }
});