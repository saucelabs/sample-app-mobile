import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, ThemeProvider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Credentials } from '../credentials.js';
import SyncStorage from 'sync-storage';
import { ShoppingCart } from '../shopping-cart.js';
import i18n from '../config/i18n';
import {testProperties} from '../config/TestProperties';
import { IS_IOS } from '../config/Constants';

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
      return this.setState({ error: i18n.t('login.usernameError') });
    }

    if (!this.state.password) {
      return this.setState({ error: i18n.t('login.passwordError') });
    }

    if (Credentials.verifyCredentials(this.state.username, this.state.password)) {
      // Catch our locked-out user and bail out
      const isLockedOutUser = Credentials.isLockedOutUser();

      if (isLockedOutUser) {
        return this.setState({ error: i18n.t('login.lockedOutError') });
      }

      // If we're here, we have a username and password. Redirect after we wipe out any previous shopping cart contents
      ShoppingCart.resetCart();
      this.props.navigation.navigate('InventoryList');
    } else {
      return this.setState({ error: i18n.t('login.noMatchError') });
    }
  }

  render() {

    var errorMessage = (<View />);

    if (this.state.error !== '') {
      errorMessage = (<View {...testProperties(i18n.t('login.errorMessage'))}>
        <Icon onPress={this.dismissError} name="times-circle" size={24} color="red" />
        <Text style={styles.error_message}>{i18n.t('login.epicSadFace')}{this.state.error}</Text>
      </View>);
    }

    return (
      <ThemeProvider>
        <Header
          containerStyle={styles.header_container}
          centerComponent={{ text: i18n.t('login.header'), style: { color: '#fff' } }}
        />
        <ScrollView contentContainerStyle={ styles.scrollContainer } keyboardShouldPersistTaps="handled" { ...testProperties(i18n.t('login.screen')) }>
          <View style={styles.container}>
            <Input containerStyle={styles.login_input} placeholder={ i18n.t('login.username') } value={this.state.username}
                   onChangeText={this.handleUserChange}
                   leftIcon={<Icon name="user" size={24} color="black" />}
                   shake={true} autoFocus={true} autoCapitalize="none" autoCorrect={false} { ...testProperties(i18n.t('login.username')) } />
            <Input containerStyle={styles.login_input} placeholder={ i18n.t('login.password') } value={this.state.password}
                   onChangeText={this.handlePassChange}
                   leftIcon={<Icon name="lock" size={28} color="black" />}
                   shake={true} secureTextEntry={true} { ...testProperties(i18n.t('login.password')) } />
            <Button onPress={this.handleSubmit} title={ i18n.t('login.loginButton') } { ...testProperties(i18n.t('login.loginButton')) } />

            {errorMessage}

            <Text style={styles.login_info}>{ i18n.t('login.loginText') }</Text>
          </View>
        </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header_container: {
    height: IS_IOS ? 80 : 50,
  },
  login_input: {
    marginBottom: 20,
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
    borderColor: '#000000',
  },
  error_message: {
    fontSize: 18,
  },
});
