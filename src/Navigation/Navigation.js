import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from '../Screens/Main/MainPage'
import Profile from '../Screens/Main/Profile'
import Stats from '../Screens/Main/Stats'

import FirstScreen from '../Screens/Auth/FirstScreen'
import Login from '../Screens/Auth/Login'
import Register from '../Screens/Auth/Register'

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName='FirstScreen'>
            <AuthStack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}

            />

            <AuthStack.Screen
                name="Login"
                component={Login}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}
            />


            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerShown: false
                }}
            />

        </AuthStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const Navigation=() =>{
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="MainPage">
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="MainPage" component={MainPage} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;