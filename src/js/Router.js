import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './screens/Login';
import InventoryList from './screens/InventoryList';
import InventoryItem from './screens/InventoryItem';
import CartContents from './screens/CartContents';
import CheckoutScreenOne from './screens/CheckoutScreenOne';
import CheckoutScreenTwo from './screens/CheckoutScreenTwo';
import CheckoutComplete from './screens/CheckoutComplete';
import WebviewSelection from './screens/WebviewSelection';
import WebviewScreen from './screens/Webview';

const Router = createStackNavigator({
    Login: { screen: Login },
    InventoryList: { screen: InventoryList },
    InventoryItem: { screen: InventoryItem },
    CartContents: { screen: CartContents },
    CheckoutScreenOne: { screen: CheckoutScreenOne },
    CheckoutScreenTwo: { screen: CheckoutScreenTwo },
    CheckoutComplete: { screen: CheckoutComplete },
    WebviewSelection: { screen: WebviewSelection },
    WebviewScreen: { screen: WebviewScreen },
  },
  {
    headerMode: 'none',
  });

export default class NavigationContainer extends Component {
  render() {
    return (
      <Router/>
    );
  }
}
