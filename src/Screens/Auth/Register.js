import React, { useState } from 'react';
import { Alert, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../Components/';
import { connect } from 'react-redux';
import { register } from "../../Actions";
import { colors } from '../../style';

const Register = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const InvalidRegister = () => {
        Alert.alert("Alert", "Invalid name, e-mail or password!");
    };
    const ValidateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        //alert("You have entered an invalid email address!")
    }
    const RegisterClick = () => {
        if (name == '' || username == '' || !ValidateEmail(email)) {
            InvalidRegister();
            return;
        }
        const params = {
            email,//"deneme@test.com",
            password,//"1234567"
            name,
            username
        };
        props.register(params);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 0.8, }}>

                <View style={{ alignItems: 'center', }}>
                    <Text style={{ width: '85%', marginBottom: 20, marginTop: 20, fontSize: 28, fontWeight: 'bold' }}>Register on Appomodoro</Text>
                    <Input placeholder='Name' value={name} onChangeText={(value) => setName(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='Username' value={username} onChangeText={(value) => setUsername(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='e-mail' value={email} onChangeText={(value) => setEmail(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='password' value={password} onChangeText={(value) => setPassword(value)} secureTextEntry style={{ marginBottom: 10, width: '85%', }} />
                </View>
            </ScrollView>



            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'space-between', padding: 10, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'gray' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.blueText}>  Login</Text>
                </TouchableOpacity>
                <Button text='Register' style={{ padding: 10, width: 150, height: 40 }} onPress={RegisterClick} loading={props.loading} />
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
}

export default connect(mapStateToProps, { register })(Register);