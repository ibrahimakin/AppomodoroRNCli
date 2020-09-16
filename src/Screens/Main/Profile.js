import React, { useState, useEffect } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { Input, Button } from '../../Components';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { signOut, updateUserInfo, /*getUserInfo*/ } from '../../Actions';

const Profile = (props) => {

    const [image, setImage] = useState(props.user.image);
    const [dailyGoal, setDailyGoal] = useState(props.user.dailygoal);
    const [studyingTime, setStudyingTime] = useState(props.user.worktime);
    const [restingTime, setRestingTime] = useState(props.user.resttime);
    const [change, setChange] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);

    const [editGoal, setEditGoal] = useState(false);
    const [editStudying, setEditStudying] = useState(false);
    const [editResting, setEditResting] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    useEffect(() => {
        if (props.user.dailygoal != dailyGoal || props.user.worktime != studyingTime || props.user.resttime != restingTime || props.user.image != image) {
            setChange(true);
        }
        else { setChange(false); }
        if (props.user.image != image) {
            setImageChanged(true);
        }
        else { setImageChanged(false); }

    }, [props.user, dailyGoal, studyingTime, restingTime, image]);

    const _keyboardDidShow = () => {
        //alert("Keyboard Shown");
    };

    const _keyboardDidHide = () => {
        //alert("Keyboard Hidden");
        setEditGoal(false);
        setEditResting(false);
        setEditStudying(false);
    };


    const selectPhoto = () => {
        const options = {
            title: 'Profil Fotoğrafı Seçiniz',
            quality: 0.2,
            takePhotoButtonTitle: 'Resim Çek',
            chooseFromLibraryButtonTitle: 'Galeriden Seç',
            cancelButtonTitle: 'Kapat',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                setImage(uri);
            }
        });
    }

    const removePhoto = () => {
        if (image == "") { return; }
        Alert.alert(
            "Fotoğrafı Kaldır",
            "Fotoğrafı kaldırmak istediğinize emin misiniz?",
            [
                {
                    text: "İptal",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "Tamam", onPress: () => { setImage(""); } }
            ],
            { cancelable: false }
        );
    }

    const SaveChanges = () => {
        const payload = {
            uid: props.user.uid,
            email: props.user.email,
            username: props.user.username,
            name: props.user.name,
            image,
            dailygoal: dailyGoal,
            worktime: studyingTime,
            resttime: restingTime,
            dailysession: props.user.dailysession,
            lastsessiondate: new Date().toLocaleDateString()
        }
        props.updateUserInfo({ imageChanged, payload });
        _keyboardDidHide();
    }
    const UndoChanges = () => {
        _keyboardDidHide();
        setImage(props.user.image);
        setDailyGoal(props.user.dailygoal);
        setStudyingTime(props.user.worktime);
        setRestingTime(props.user.resttime);
    }
    const logout = () => {
        const text = 'Çıkış yapmak istediğinize emin misiniz?';
        const edit = '\nKaydedilmemiş değişiklikler kaybolacak.';
        Alert.alert(
            "Çıkış Yap",
            change ? text + edit : text,
            [
                {
                    text: "İptal",
                    onPress: () => { console.log("Çıkış iptal") },
                    style: "cancel"
                },
                { text: "Tamam", onPress: () => { props.signOut(); } }
            ],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {/* Profile picture  */}
                    <View style={styles.photo}>
                        <TouchableOpacity onPress={() => selectPhoto()} style={{ borderRadius: 25, backgroundColor: '#4495cb', borderWidth: 3 }}>
                            {
                                image != "" ?
                                    <Image style={{ height: 150, width: 150, borderRadius: 25 }} source={{ uri: image }} /*source={{ url: image }}*/ />
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
                            <Text style={styles.textDetail}>{props.user.username/*user.username*/}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}> İsim : </Text>
                            <Text style={styles.textDetail}>{props.user.name/*user.fullName*/}</Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.text}> Mail : </Text>
                            <Text style={styles.textDetail}>{props.user.email/*user.email*/}</Text>
                        </View>

                    </View>

                    {/* Profile goals  */}
                    <View style={[styles.profile]}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.text]}> Günlük Hedef : </Text>
                            {editGoal ?
                                <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setDailyGoal(value); }} style={styles.textDetail} />
                                :
                                <TouchableOpacity onPress={() => { setEditGoal(true) }}>
                                    <Text style={styles.textGoalDetail}>{/*props.user.dailygoal*/dailyGoal}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}> Çalışma Süresi : </Text>
                            {editStudying ?
                                <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setStudyingTime(value); }} style={styles.textDetail} />
                                :
                                <TouchableOpacity onPress={() => { setEditStudying(true) }}>
                                    <Text style={styles.textGoalDetail}>{/*props.user.worktime*/studyingTime}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}> Dinlenme Süresi : </Text>
                            {editResting ?
                                <Input keyboardType='number-pad' autoFocus={true} onChangeText={(value) => { setRestingTime(value); }} style={styles.textDetail} />
                                :
                                <TouchableOpacity onPress={() => { setEditResting(true) }}>
                                    <Text style={styles.textGoalDetail}>{/*props.user.resttime*/restingTime}</Text>
                                </TouchableOpacity>
                            }

                        </View>


                    </View>

                    <TouchableOpacity onPress={logout} style={[styles.textContainer, { alignSelf: 'center' }]}>
                        <Text style={{ marginRight: 15, }}>Çıkış Yap</Text>

                        <Image style={{ height: 30, width: 30, }} source={require('../../images/logout.png')} />
                    </TouchableOpacity>


                </ScrollView>
            </View>
            {change ?
                <View style={{ marginBottom: 5, marginRight: 5, backgroundColor: 'transparent', flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <Button text='Geri al' onPress={UndoChanges} style={{ height: 30, width: 100, backgroundColor: 'gray', marginRight: 5 }} />
                    <Button text='Kaydet' onPress={SaveChanges} loading={props.loading} style={{ height: 30, width: 100, }} />
                </View>
                :
                null
            }
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
        justifyContent: 'space-between',
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
        paddingLeft: 8,
        borderWidth: 2,
        borderRadius: 15,
    }
}

const mapStateToProps = ({ authResponse /*, profileResponse*/ }) => {
    //const { loading, data } = profileResponse;
    const { loading, user } = authResponse;
    return { loading, user /*data*/ };
};

export default connect(mapStateToProps, { signOut, updateUserInfo /*getUserInfo*/ })(Profile);