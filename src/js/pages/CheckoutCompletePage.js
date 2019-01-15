import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import AppHeader from '../AppHeader.js';
import { IS_IOS } from '../config/Constants';
import i18n from '../config/i18n';
import {testProperties} from '../config/TestProperties';

export default class CheckoutCompletePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ThemeProvider>
        <AppHeader navigation={this.props.navigation}>
          <Image source={require('../../img/peek.png')} style={styles.peek_img} />
          <View style={styles.secondary_header}>
            <Text style={styles.header_title}>{ i18n.t('checkoutCompletePage.header')}</Text>
          </View>
          <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" { ...testProperties(i18n.t('checkoutCompletePage.screen')) }>

            <View style={styles.complete_container}>
              <Text style={styles.complete_title}>{ i18n.t('checkoutCompletePage.completeContainer.header')}</Text>
              <Text style={styles.complete_text}>{ i18n.t('checkoutCompletePage.completeContainer.text')}</Text>
            </View>

            <Image resizeMode="contain" source={require('../../img/pony-express.jpg')} style={styles.ship_image} />

            <View style={styles.cart_footer}>
              <Button buttonStyle={styles.checkout_button} containerStyle={styles.checkout_button_container}
                      onPress={() => {this.props.navigation.navigate('InventoryList');}} title={ i18n.t('checkoutCompletePage.goToButton')}
                      { ...testProperties(i18n.t('checkoutCompletePage.goToButton')) }/>
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
    flexDirection: 'row',
  },
  complete_title: {
    fontSize: 24,
    fontWeight: '800',
    padding: 5,
  },
  complete_text: {
    fontSize: 18,
    color: '#000',
    padding: 5,
  },
  header_title: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 90,
    marginTop: 32,
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  peek_img: {
    width: 71,
    height: 70,
    top: IS_IOS ? 100 : 80,
    left: 5,
    position: 'absolute',
    zIndex: 10,
  },
  cart_footer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  checkout_button: {
    flex: 1,
  },
  ship_image: {
    width: '100%',
  },
  checkout_button_container: {
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
    top: -10,
  },
});
