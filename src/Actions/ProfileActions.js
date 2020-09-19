import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED,
    GET_USERINFO_START, GET_USERINFO_SUCCESS, GET_USERINFO_FAILED,
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED,
    UPDATE_USERINFO_START, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILED,
    SET_SESSION_START, SET_SESSION_SUCCESS, SET_SESSION_FAILED
} from './types';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { utils } from '@react-native-firebase/app';



export const getUserInfo = (params) => {
    return (dispatch) => {

        dispatch({ type: GET_USERINFO_START });
        const uid = params.uid;

        firestore()
            .collection('UserInfo')
            .doc(uid)
            .get()
            .then((userInfo) => {
                console.log('USER INFO get!', userInfo);

                const userParams = {
                    ...userInfo._data,
                    uid
                }

                console.log('USER INFO data!', userParams);

                dispatch({ type: GET_USERINFO_SUCCESS, payload: userParams });

            }).catch(() => {
                console.log('USER INFO not added');
                dispatch({ type: GET_USERINFO_FAILED });
            });
    }
}

export const updateUserInfo = (params) => {
    return (dispatch) => {

        dispatch({ type: LOGIN_START });

        const uid = params.payload.uid;
        const payload = params.payload;

        if (params.imageChanged && payload.image != "") {
            const reference = storage().ref(`/images/${uid}`);

            reference.putFile(payload.image).then(() => {

                reference.getDownloadURL().then((imageURL) => {
                    firestore()
                        .collection('UserInfo')
                        .doc(uid)
                        .update({
                            image: imageURL,
                            dailygoal: payload.dailygoal,
                            worktime: payload.worktime,
                            resttime: payload.resttime,
                        })
                        .then(() => {

                            dispatch({ type: LOGIN_SUCCESS, payload });

                        }).catch(() => {
                            dispatch({ type: LOGIN_FAILED });
                        });
                })
            }).catch(error => {
                //console.log('Hata Resim Yükleme: ', error);
                Alert.alert("Hata", "Resim Yüklenemedi:\n" + error);
            })

        }
        else {
            firestore()
                .collection('UserInfo')
                .doc(uid)
                .update({
                    image: payload.image,
                    dailygoal: payload.dailygoal,
                    worktime: payload.worktime,
                    resttime: payload.resttime,
                })
                .then(() => {
                    //console.log('User updated!');

                    dispatch({ type: LOGIN_SUCCESS, payload });

                }).catch((err) => {
                    //console.log('USER INFO not updated', err);
                    dispatch({ type: LOGIN_FAILED });
                });
        }
    }
}

export const updateDailySession = (params) => {
    return (dispatch) => {

        dispatch({ type: LOGIN_START });

        const uid = params.payload.uid;
        const payload = params.payload;


        firestore()
            .collection('UserInfo')
            .doc(uid)
            .update({
                dailysession: payload.dailysession,
                lastsessiondate: payload.lastsessiondate
            })
            .then(() => {
                //console.log('User updated!');

                dispatch({ type: LOGIN_SUCCESS, payload });

            }).catch(() => {
                //console.log('USER INFO not updated');
                dispatch({ type: LOGIN_FAILED });
            });

    }
}