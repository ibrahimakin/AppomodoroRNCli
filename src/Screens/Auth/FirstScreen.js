import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, Dimensions } from 'react-native';

import { Input, Button } from '../../Components'

const { width, height } = Dimensions.get('window');

const FirstScreen = (props) => {
    useEffect(() => {
       
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{borderColor: 'black', borderWidth: 7, borderRadius: 50, width: 200, height: 200}}
            source={require('../../images/appomodoro-logo.jpeg')} />
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>Appomodoro</Text>
            </View>

            <View style={{ flex: 2, width: '80%', alignItems: 'center', justifyContent: 'space-around'  }}>
                <Button
                    text={'Login'}
                    onPress={() => {
                        props.navigation.navigate('Login')
                    }}
                />
                 <Button
                    text={'Register'}
                    onPress={() => {
                        props.navigation.navigate('Register')
                    }}
                />
            </View>
      
            {/* <View style={{ flex: 2, width: '80%', alignItems: 'center', justifyContent: 'flex-start'  }}>
               
            </View> */}

        </SafeAreaView>
    )
}

export default FirstScreen;