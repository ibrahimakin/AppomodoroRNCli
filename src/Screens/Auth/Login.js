import React, { useState, useEffect } from 'react';
import { Alert, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Input } from '../../Components/';
import { colors } from '../../style';
import { connect } from 'react-redux';
import { login } from '../../Actions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = (props) => {
    const [email, setEmail] = useState('test@test.com')
    const [password, setPassword] = useState('123456')

    const InvalidLogin = () => {
        Alert.alert("Alert", "Login e-mail or password!");
    };
    const ValidateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        //alert("You have entered an invalid email address!")
    }
    const LoginClick = () => {
        if (!ValidateEmail(email) || password == '') {
            InvalidLogin();
            return;
        }
        const params = {
            email,//"deneme@test.com",
            password,//"1234567"
        };
        props.login(params);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 0.8, }}>

                <View style={{ alignItems: 'center', }}>
                    <Text style={{ width: '85%', marginBottom: 20, marginTop: 20, fontSize: 28, fontWeight: 'bold' }}>Appomodoro'ya Giriş Yap</Text>
                    <Input placeholder='e-posta' value={email} onChangeText={(value) => setEmail(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='şifre' value={password} onChangeText={(value) => setPassword(value)} secureTextEntry style={{ marginBottom: 10, width: '85%', }} />
                </View>
            </ScrollView>



            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'space-between', padding: 10, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'gray' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                    <Text style={styles.blueText} >  Yeni hesap oluştur!</Text>
                </TouchableOpacity>
                <Button text='Giriş Yap' style={{ padding: 10, width: 150, height: 40 }} onPress={LoginClick} loading={props.loading} />
            </View>
        </SafeAreaView>
    );
}

const styles = {
    mainText: { color: 'gray' },
    blueText: { color: '#4495cb', fontWeight: 'bold' },
    logo: { width: 200, height: 100, marginBottom: 10, },
    facebook: { width: 20, height: 20 },
    line: { width: '35%', height: 0.5, backgroundColor: 'gray' }

}
const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { login })(Login);