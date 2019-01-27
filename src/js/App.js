import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationContainer from './Router';
import SwagLabsStatusBar from './components/StatusBar';

export default class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <SwagLabsStatusBar/>
        <NavigationContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
