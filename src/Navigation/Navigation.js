import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from '../Screens/Main/MainPage'
import Profile from '../Screens/Main/Profile'
import Stats from '../Screens/Main/Stats'

import Login from '../Screens/Auth/Login'
import Register from '../Screens/Auth/Register'

const Tab = createBottomTabNavigator();

const Navigation=() =>{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="MainPage" component={MainPage} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;