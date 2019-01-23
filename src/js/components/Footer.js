import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';
import { MUSEO_SANS_NORMAL, WINDOW_WIDTH } from '../config/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../config/i18n';
import { Text } from 'react-native-elements';

export default class Footer extends Component {
  render() {
    return (
      <View style={ styles.footerContainer }>
        <View style={ styles.socialContainer }>
          <Icon style={ styles.icon } name="twitter"/>
          <Icon style={ styles.icon } name="facebook-f"/>
          <Icon style={ styles.icon } name="google-plus"/>
          <Icon style={ styles.icon } name="linkedin"/>
        </View>
        <Text style={styles.footerText}>{i18n.t('footer.rights')}</Text>
        <Text style={styles.footerText}>{i18n.t('footer.termsAndPrivacy')}</Text>
        <Image
          style={ styles.footer_image }
          resizeMode="contain"
          source={ require('../../img/footer-swagbot.png') }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: colors.gray,
    marginTop: 20,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  icon: {
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 30,
    color: colors.white,
    fontSize: 30,
    height: 60,
    width: 60,
    paddingTop: 13,
    textAlign: 'center',
  },
  footerText: {
    color: colors.white,
    fontFamily: MUSEO_SANS_NORMAL,
    fontSize: 16,
    textAlign: 'center',
  },
  footer_image: {
    marginTop: 40,
    flex: 1,
    alignSelf: 'stretch',
    // This is for keeping the aspect ratio and make it repsonse
    height: (WINDOW_WIDTH - 40) * 0.73,
    width: WINDOW_WIDTH - 40,
  },
});
