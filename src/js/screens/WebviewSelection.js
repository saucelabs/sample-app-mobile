import React, { Component } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { testProperties } from '../config/TestProperties';
import { ThemeProvider } from 'react-native-elements';
import I18n from '../config/I18n';
import Footer from '../components/Footer';
import ErrorMessageContainer from '../components/ErrorMessageContainer';
import InputError from '../components/InputError';
import ActionButton from '../components/ActionButton';
import SecondaryHeader from '../components/SecondaryHeader';
import { SCREENS } from '../config/Constants';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';

export default class WebviewSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteUrl: '',
      error: false,
      urlError: '',
    };
  }

  componentDidMount() {
    handleQuickActionsNavigation(this.props.navigation);
  }

  addHttps = (url) => {
    return !/^(f|ht)tps?:\/\//i.test(url) ? 'https://' + url : url;
  };

  handleSubmit = () => {
    const url = this.addHttps(this.state.siteUrl);
    const pattern = /^((https):\/\/www.)+[a-zA-Z0-9\-.]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;
    if (pattern.test(url)) {
      this.setSiteUrl('');
      this.resetState();
      Keyboard.dismiss();

      return this.props.navigation.navigate(SCREENS.WEBVIEW_SCREEN, { url: url });
    } else {
      return this.setState({
        error: true,
        urlError: I18n.t('webview.urlError'),
      });
    }
  };

  setSiteUrl = (siteUrl) => this.setState({ siteUrl });

  resetState() {
    return this.setState({
      error: false,
      urlError: '',
    });
  }

  render() {
    return (
      <ThemeProvider>
        <SecondaryHeader header={ I18n.t('webview.screen') } />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={ styles.container }
          { ...testProperties(I18n.t('webview.screen')) }
        >
          <View style={ [ styles.webview_container, styles.container_padding ] }>
            <InputError
              autoCapitalize="none"
              autoCorrect={ false }
              placeholder={ 'webview.placeholder' }
              value={ this.state.siteUrl }
              onChangeText={ this.setSiteUrl }
              error={ this.state.error }
            />
            <ErrorMessageContainer
              testID={ I18n.t('webview.errorContainer') }
              message={ this.state.urlError }
            />
          </View>
          <View style={ [ styles.container_padding, styles.button_container ] }>
            <ActionButton
              onPress={ this.handleSubmit }
              title={ I18n.t('webview.go') }
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
    flex: 1,
    backgroundColor: '#FFF',
  },
  container_padding: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  webview_container: {
    alignItems: 'center',
    paddingTop: 120,
  },
  button_container: {
    paddingBottom: 120,
  },
});
