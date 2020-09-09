import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED, SIGNOUT_SUCCESS } from './types'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const login = (params) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START });
        auth()
            .signInWithEmailAndPassword(params.email, params.password)
            .then((data) => {
                //console.log('User signed in!', data.user);
                const uid = data.user._user.uid;

                //read user from the database
                firestore()
                    .collection('UserInfo')
                    .doc(uid)
                    .get().then((user) => {
                        const userParams = {
                            ...user._data,
                            uid
                        }
                        dispatch({ type: LOGIN_SUCCESS, payload: userParams });
                    }).catch((err) => {
                        dispatch({ type: LOGIN_FAILED });
                    });

            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Alert', 'User not found.');
                }
                dispatch({ type: LOGIN_FAILED });
                Alert.alert('Alert', 'User not found.');
                //console.log(error);
            });
    }
}

export const register = (params) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_START });
        auth()
            .createUserWithEmailAndPassword(params.email, params.password)
            .then((data) => {
                const uid = data.user._user.uid;

                //write user to the database
                const setData = {
                    email: params.email,
                    username: params.username,
                    name: params.name,
                    image: params.image,
                    dailygoal: params.dailygoal,
                    worktime: params.worktime,
                    resttime: params.resttime,
                }
                firestore()
                    .collection('UserInfo')
                    .doc(uid)
                    .set(setData)
                    .then(() => {
                        dispatch({ type: REGISTER_SUCCESS, payload: setData });

                        // console.log('User added!');
                        // RootNavigation.pop();
                    }).catch(() => { });

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    //console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    //console.log('That email address is invalid!');
                }
                dispatch({ type: REGISTER_FAILED });

                //console.error(error);
            });
    }
}

export const signOut = () => {
    return (dispatch) => {
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: SIGNOUT_SUCCESS });
            });
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}