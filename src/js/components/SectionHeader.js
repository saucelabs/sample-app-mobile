import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../config/i18n';
import { Divider } from 'react-native-elements';
import { colors } from '../utils/colors';
import { MUSEO_SANS_NORMAL } from '../config/Constants';

export default class SectionHeader extends Component {
  render() {
    return (
      <View style={ styles.section_header }>
        <View style={ styles.section_header_container }>
          <Text style={ styles.section_qty }>{ i18n.t('cartContent.quantity') }</Text>
          <Text style={ styles.section_desc }>{ i18n.t('cartContent.description') }</Text>
        </View>
        <Divider style={ styles.divider }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section_header: {
    backgroundColor: colors.white,
    padding: 10,
  },
  section_header_container: {
    flexDirection: 'row',
  },
  section_qty: {
    flex: 1,
    color: colors.gray,
    fontFamily: MUSEO_SANS_NORMAL,
    fontSize: 18,
    paddingTop: 3,
  },
  section_desc: {
    flex: 4,
    fontSize: 18,
    color: colors.gray,
    paddingTop: 3,
  },
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 15,
  },
});
