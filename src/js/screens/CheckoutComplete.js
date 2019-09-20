import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL, SCREENS, WINDOW_WIDTH } from '../config/Constants';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import ActionButton from '../components/ActionButton';
import SecondaryHeader from '../components/SecondaryHeader';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';

export default class CheckoutComplete extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    handleQuickActionsNavigation(this.props.navigation);
  }

  render() {
    return (
      <ThemeProvider>
        <SecondaryHeader header={ I18n.t('checkoutCompletePage.header') }/>
        <ScrollView
          style={ styles.container }
          keyboardShouldPersistTaps="handled"
          { ...testProperties(I18n.t('checkoutCompletePage.screen')) }
        >
          <View style={ styles.wrapper }>

            <View style={ styles.complete_container }>
              <Text style={ styles.complete_title }>{ I18n.t('checkoutCompletePage.completeContainer.header') }</Text>
              <Text style={ styles.complete_text }>{ I18n.t('checkoutCompletePage.completeContainer.text') }</Text>
            </View>

            <Image
              resizeMode="contain"
              source={ require('../../img/pony-express.png') }
              style={ styles.ship_image }
            />

            <ActionButton
              onPress={ () => this.props.navigation.navigate(SCREENS.INVENTORY_LIST) }
              title={ I18n.t('checkoutCompletePage.goToButton') }
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
    backgroundColor: colors.white,
  },
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 35,
    paddingBottom: 20,
  },
  complete_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  complete_title: {
    color: colors.gray,
    fontSize: 24,
    fontFamily: MUSEO_SANS_BOLD,
    textAlign: 'center',
  },
  complete_text: {
    color: colors.gray,
    fontSize: 18,
    fontFamily: MUSEO_SANS_NORMAL,
    paddingTop: 15,
    textAlign: 'center',
  },
  ship_image: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    marginTop: 30,
    // This is for keeping the aspect ratio and make it responsive
    height: (WINDOW_WIDTH - 40) * 0.73,
    width: WINDOW_WIDTH - 40,
  },
});
