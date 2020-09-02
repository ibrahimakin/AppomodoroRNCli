import React from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';


const Profile = (props) => {


    const user = {
        username: 'user0123',
        fullName: 'Deneme TEST',
        email: 'deneme@test.com',

        dailyGoal: 5,
        studyingTime: 45,
        restingTime: 15,
    }

    const selectPhoto = () => {
        console.log('select photo');
    }

    return (
        <SafeAreaView>
            <ScrollView >
                {/* Profile picture  */}
                <View style={styles.photo}>
                    <TouchableOpacity onPress={() => selectPhoto()} style={{ borderRadius: 25, backgroundColor: 'green', borderWidth: 3 }}>
                        <Image style={{ height: 150, width: 150 }} source={require('../../images/appomodoro_icon.png')} />
                    </TouchableOpacity>

                </View>
                {/* Profile details  */}
                <View style={styles.profile}>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Username : </Text>
                        <Text style={styles.textDetail}>{user.username}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Full Name : </Text>
                        <Text style={styles.textDetail}>{user.fullName}</Text>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.text}> e-mail : </Text>
                        <Text style={styles.textDetail}>{user.email}</Text>
                    </View>

                </View>

                {/* Profile goals  */}
                <View style={[styles.profile]}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text]}> Günlük Hedef : </Text>
                        <Text style={styles.textDetail}>{user.dailyGoal}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Full Name : </Text>
                        <Text style={styles.textDetail}>{user.studyingTime}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> e-mail : </Text>
                        <Text style={styles.textDetail}>{user.restingTime}</Text>
                    </View>
                </View>

            </ScrollView >
        </SafeAreaView>

    );

}
const styles = {
    photo: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        padding: 15,
    },
    profile: {
        padding: 30,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 15,
    },
    text: {
        fontSize: 18,
    },
    textDetail: {
        fontSize: 25,
        fontWeight: 'bold',
    }
}

export default Profile;
