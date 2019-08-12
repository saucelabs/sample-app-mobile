import React, { Component } from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
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
    [SCREENS.INVENTORY_LIST]: {
      screen: InventoryList ,
      path: 'swag-overview',
    },
    [SCREENS.INVENTORY_ITEM]: {
      screen: InventoryItem ,
      path: 'swag-item/:item',
    },
    [SCREENS.CART_CONTENTS]: {
      screen: CartContents ,
      path: 'cart/:items',
    },
    [SCREENS.CHECKOUT_SCREEN_ONE]: {
      screen: CheckoutScreenOne,
      path: 'personal-info/',
    },
    [SCREENS.CHECKOUT_SCREEN_TWO]: {
      screen: CheckoutScreenTwo,
      path: 'checkout-overview/:items',
    },
    [SCREENS.CHECKOUT_COMPLETE]: {
      screen: CheckoutComplete,
      path: 'complete',
    },
    [SCREENS.WEBVIEW_SELECTION]: {
      screen: WebviewSelection,
      path: 'webview',
    },
    [SCREENS.WEBVIEW_SCREEN]: {
      screen: WebviewScreen,
      path: 'webview-selection/:url',
    },
  },
  {
    initialRouteName: SCREENS.LOGIN,
    defaultNavigationOptions: ({ navigate, navigation }) => ({
      header: (<AppHeader navigation={ navigation }/>),
      gesturesEnabled: false,
    }),
  });

const DrawerNavigator = createDrawerNavigator({
  StackNavigator: { screen: StackNavigator },
}, {
  contentComponent: DrawerLinks,
  drawerWidth: WINDOW_WIDTH,
  gesturesEnabled: false,
});

const Router = createAppContainer(DrawerNavigator);
const prefix = 'swagLabs://';

export default class NavigationContainer extends Component {
  render() {
    return (
      <Router uriPrefix={ prefix }/>
    );
  }
}
