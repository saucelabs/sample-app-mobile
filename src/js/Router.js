import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import AppHeader from './components/AppHeader';
import { WINDOW_WIDTH } from './config/Constants';

// The screens
import Login from './screens/Login';
import InventoryList from './screens/InventoryList';
import InventoryItem from './screens/InventoryItem';
import CartContents from './screens/CartContents';
import CheckoutScreenOne from './screens/CheckoutScreenOne';
import CheckoutScreenTwo from './screens/CheckoutScreenTwo';
import CheckoutComplete from './screens/CheckoutComplete';
import WebviewSelection from './screens/WebviewSelection';
import WebviewScreen from './screens/Webview';
import DrawerLinks from './components/DrawerLinks';

export const SCREENS = {
  LOGIN: 'Login',
  INVENTORY_LIST: 'InventoryList',
  INVENTORY_ITEM: 'InventoryItem',
  CART_CONTENTS: 'CartContents',
  CHECKOUT_SCREEN_ONE: 'CheckoutScreenOne',
  CHECKOUT_SCREEN_TWO: 'CheckoutScreenTwo',
  CHECKOUT_COMPLETE: 'CheckoutComplete',
  WEBVIEW_SELECTION: 'WebviewSelection',
  WEBVIEW_SCREEN: 'WebviewScreen',
};

const StackNavigator = createStackNavigator({
    [SCREENS.LOGIN]: { screen: Login },
    [SCREENS.INVENTORY_LIST]: { screen: InventoryList },
    [SCREENS.INVENTORY_ITEM]: { screen: InventoryItem },
    [SCREENS.CART_CONTENTS]: { screen: CartContents },
    [SCREENS.CHECKOUT_SCREEN_ONE]: { screen: CheckoutScreenOne },
    [SCREENS.CHECKOUT_SCREEN_TWO]: { screen: CheckoutScreenTwo },
    [SCREENS.CHECKOUT_COMPLETE]: { screen: CheckoutComplete },
    [SCREENS.WEBVIEW_SELECTION]: { screen: WebviewSelection },
    [SCREENS.WEBVIEW_SCREEN]: { screen: WebviewScreen },
  },
  {
    initialRouteName: SCREENS.LOGIN,
    navigationOptions: ({ navigate, navigation }) => ({
      header: (<AppHeader navigation={ navigation }/>),
      gesturesEnabled: false,
    }),
  });

const Router = createDrawerNavigator({
  StackNavigator: { screen: StackNavigator },
}, {
  contentComponent: DrawerLinks,
  drawerWidth: WINDOW_WIDTH,
  gesturesEnabled: false,
});

export default class NavigationContainer extends Component {
  render() {
    return (
      <Router/>
    );
  }
}
