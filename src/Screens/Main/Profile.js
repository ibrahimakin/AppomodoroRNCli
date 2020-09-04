import React, { useState, useEffect } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { Input } from '../../Components';
import ImagePicker from 'react-native-image-picker';
import { set } from 'react-native-reanimated';

const Profile = (props) => {


    const [image, setImage] = useState();
    const [dailyGoal, setDilyGoal] = useState(5);
    const [studyingTime, setStudyingTime] = useState(45);
    const [restingTime, setRestingTime] = useState(15);

    const [editGoal, setEditGoal] = useState(false);
    const [editStudying, setEditStudying] = useState(false);
    const [editResting, setEditResting] = useState(false);

    const user = {
        username: 'user0123',
        fullName: 'Deneme TEST',
        email: 'deneme@test.com',
        image,

        dailyGoal,
        studyingTime,
        restingTime,
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        //alert("Keyboard Shown");
    };

    const _keyboardDidHide = () => {
        //alert("Keyboard Hidden");
        setEditGoal(false);
        setEditResting(false);
        setEditStudying(false);
    };

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

    const removePhoto = () => {
        if (user.image == null) { return; }
        Alert.alert(
            "Fotoğrafı Kaldır",
            "Fotoğrafı kaldırmak istediğinize emin misiniz?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "OK", onPress: () => { setImage(null); } }
            ],
            { cancelable: false }
        );
    }

    const logout = () => {
        Alert.alert(
            "Çıkış Yap",
            "Çıkış yapmak istediğinize emin misiniz?",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("Çıkış iptal") },
                    style: "cancel"
                },
                { text: "OK", onPress: () => { console.log("Çıkış yapılacak") } }
            ],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView>
            <ScrollView >
                {/* Profile picture  */}
                <View style={styles.photo}>
                    <TouchableOpacity onPress={() => selectPhoto()} style={{ borderRadius: 25, backgroundColor: '#4495cb', borderWidth: 3 }}>
                        {
                            user.image ?
                                <Image style={{ height: 150, width: 150, borderRadius: 25 }} source={image} />
                                :
                                <Image style={{ height: 150, width: 150, borderRadius: 25 }} source={require('../../images/appomodoro_icon.png')} />
                        }

                    </TouchableOpacity>
                    <TouchableOpacity onPress={removePhoto} style={{ alignSelf: 'flex-end', borderWidth: 3, borderRadius: 15, }}>
                        <Text style={[styles.text]}> X </Text>
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
                        {editGoal ?
                            <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setDilyGoal(value); }} style={styles.textDetail} />
                            :
                            <TouchableOpacity onPress={() => { setEditGoal(true) }}>
                                <Text style={styles.textGoalDetail}>{user.dailyGoal}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Çalışma Süresi : </Text>
                        {editStudying ?
                            <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setStudyingTime(value); }} style={styles.textDetail} />
                            :
                            <TouchableOpacity onPress={() => { setEditStudying(true) }}>
                                <Text style={styles.textGoalDetail}>{user.studyingTime}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Dinlenme Süresi : </Text>
                        {editResting ?
                            <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setRestingTime(value); }} style={styles.textDetail} />
                            :
                            <TouchableOpacity onPress={() => { setEditResting(true) }}>
                                <Text style={styles.textGoalDetail}>{user.restingTime}</Text>
                            </TouchableOpacity>
                        }

                    </View>

                </View>

                <TouchableOpacity onPress={logout} style={[styles.textContainer, { alignSelf: 'center' }]}>
                    <Text style={{ marginRight: 15, }}>Çıkış Yap</Text>

                    <Image style={{ height: 30, width: 30, }} source={require('../../images/logout.png')} />
                </TouchableOpacity>

            </ScrollView >
        </SafeAreaView>

    );

}
const styles = {
    photo: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        padding: 15,
        flexDirection: 'row',
    },
    profile: {
        padding: 30,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
    },
    textDetail: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    textGoalDetail: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 5,
        borderWidth: 2,
        borderRadius: 15,
    }
}

export default Profile;
