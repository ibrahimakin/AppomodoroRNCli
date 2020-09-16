import * as React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from '../Screens/Main/MainPage'
import MainAlternative from '../Screens/Main/MainAlternative';
import Profile from '../Screens/Main/Profile'
import Stats from '../Screens/Main/Stats'

import FirstScreen from '../Screens/Auth/FirstScreen'
import Login from '../Screens/Auth/Login'
import Register from '../Screens/Auth/Register'
import { colors } from '../style';
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
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = 'home'
                    } else if (route.name === "Statistics") {
                        iconName = 'signal';
                    } else if (route.name === "Profile") {
                        iconName = 'user';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} type='FontAwesome' size={size} style={{ color: focused ? colors.main : color }} />;
                },
            })}
            tabBarOptions={{
                //activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false,
            }}
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
// const Navigation=() =>{
//   return (
//     <NavigationContainer>
//         {/* <AuthStack.Navigator initialRouteName="FirstScreen">
//         <AuthStack.Screen name="FirstScreen" component={FirstScreen}/>
//         <AuthStack.Screen name="Login" component={Login}/>
//         <AuthStack.Screen name="Register" component={Register}/>
//         </AuthStack.Navigator> */}
//       <Tab.Navigator initialRouteName="MainPage">
//         <Tab.Screen name="Stats" component={Stats} />
//         <Tab.Screen name="MainPage" component={MainPage} />
//         <Tab.Screen name="Profile" component={Profile} />
//         <Tab.Screen name="AuthStackScreen" component={AuthStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// >>>>>>> Stashed changes
// }

