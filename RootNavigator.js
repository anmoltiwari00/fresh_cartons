import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './src/features/login/screens/SignIn/SignInScreen';
import LogInScreen from './src/features/login/screens/LogIn/LogInScreen';
import HomeScreen from './src/features/home/screens/Home/HomeScreen';
import ProductHomeScreen from './src/features/product/screens/Home/HomeScreen'
import PastOrdersScreen from './src/features/orders/screens/PastOrders/PastOrders';
import CartHomeScreen from './src/features/cart/screens/Home/HomeScreen';
import CategoriesScreen from './src/features/home/screens/Categories/CategoriesScreen';
import PaymentHomeScreen from './src/features/payment/screens/Home/HomeScreen';
import AddCardScreen from './src/features/payment/screens/AddCard/AddCardScreen';
import MainScreen from './MainScreen';

import SideDrawer from './src/shared/SideDrawer';

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  LogIn: LogInScreen
});

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Product: ProductHomeScreen,
  PastOrders: PastOrdersScreen,
  CartHome: CartHomeScreen,
  Categories: CategoriesScreen,
  Payment: PaymentHomeScreen,
  AddCard: AddCardScreen
});

const DrawerStack = createDrawerNavigator(
  {
    Home: AppStack
  },
  {
    drawerWidth: '70%',
    drawerBackgroundColor: '#FF9E2D',
    hideStatusBar: true,
    drawerType: 'slide',
    contentComponent: props => <SideDrawer {...props} />
  }
);

const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: MainScreen,
      App: DrawerStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
      defaultNavigationOptions: {
        headerTransparent: true
      }
    }
  )
);

export default RootNavigator;
