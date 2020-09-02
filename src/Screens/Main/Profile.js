import React, { useState } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Profile = (props) => {


    const [image, setImage] = useState();
    const [change, setChange] = useState();

    const user = {
        username: 'user0123',
        fullName: 'Deneme TEST',
        email: 'deneme@test.com',

        dailyGoal: 5,
        studyingTime: 45,
        restingTime: 15,
    }

    const options = {
        title: 'Select Avatar',
        //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const selectPhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setImage(source);
            }
        });
    }

    return (
        <SafeAreaView>
            <ScrollView >
                {/* Profile picture  */}
                <View style={styles.photo}>
                    <TouchableOpacity onPress={() => selectPhoto()} style={{ borderRadius: 25, backgroundColor: 'green', borderWidth: 3 }}>
                        {
                            image ?
                                <Image style={{ height: 150, width: 150, borderRadius: 25 }} source={image} />
                                :
                                <Image style={{ height: 150, width: 150, borderRadius: 25 }} source={require('../../images/appomodoro_icon.png')} />
                        }

                    </TouchableOpacity>

                </View>
                {/* Profile details  */}
                <View style={styles.profile}>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Kullanıcı Adı : </Text>
                        <Text style={styles.textDetail}>{user.username}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> İsim : </Text>
                        <Text style={styles.textDetail}>{user.fullName}</Text>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.text}> Mail : </Text>
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
                        <Text style={styles.text}> Çalışma Süresi : </Text>
                        <Text style={styles.textDetail}>{user.studyingTime}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Dinlenme Süresi : </Text>
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
