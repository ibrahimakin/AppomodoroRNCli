import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button } from '../../Components'

const FirstScreen = (props) => {
    useEffect(() => {
       
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

            <View style={{ flex: 1, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../images/appomodoro-logo.jpeg')} />
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Appomodoro</Text>
            </View>

            <View style={{ flex: 1, width: '80%', alignItems: 'center', justifyContent: 'center'  }}>
                <Button
                    text={'Kayıt Ol'}
                    onPress={() => {
                        props.navigation.navigate('Register')
                    }}
                />
            </View>

            <View style={{ flex: 1, width: '80%', alignItems: 'center', justifyContent: 'center'  }}>
            <Button
                    text={'Giriş Yap'}
                    onPress={() => {
                        props.navigation.navigate('Login')
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default FirstScreen;