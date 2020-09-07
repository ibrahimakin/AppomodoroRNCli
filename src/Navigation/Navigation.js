import * as React from 'react';
import { Text, View } from 'react-native';
//import { Icon } from 'native-base';
import { connect } from 'react-redux';
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

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => {
    return (
        <TabStack.Navigator
            initialRouteName="Home"
        /*screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home'
                } else if (route.name === 'Search') {
                    iconName = 'search';
                } else if (route.name === 'Notifications') {
                    iconName = 'bell';
                } else if (route.name === 'Messages') {
                    iconName = 'envelope-open';
                }


                // You can return any component that you like here!
            return <Icon name={iconName} type='FontAwesome' size={size} style={{ color: focused ? colors.main : color }} />;
            },
        })}
        tabBarOptions={{
            //activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false,
        }}*/
        >
            <TabStack.Screen name="Statistics" component={Stats} />
            <TabStack.Screen name="Home" component={MainPage} />
            <TabStack.Screen name="Profile" component={Profile} />
        </TabStack.Navigator>);
};

const Navigation = (props) => {
    return (
        <NavigationContainer>
            {!props.user ?
                <AuthStackScreen />
                :
                <TabStackScreen />
            }
        </NavigationContainer>
    );
}

const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, {})(Navigation);
