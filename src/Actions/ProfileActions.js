import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, GET_USERINFO_START, GET_USERINFO_SUCCESS, GET_USERINFO_FAILED, UPDATE_USERINFO_START, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILED } from './types';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const getUserInfo = (params) => {
    return (dispatch) => {

        /*dispatch({ type: GET_USERINFO_START });
        const uid = params.uid;

        firestore()
            .collection('UserInfo')
            .doc(uid)
            .get()
            .then((userInfo) => {
                console.log('USER INFO get!', userInfo);

                const userParams = {
                    ...user._data,
                    uid
                }

                console.log('USER INFO data!', userParams);

                dispatch({ type: GET_USERINFO_SUCCESS, payload: userParams });

            }).catch(() => {
                console.log('USER INFO not added');
                dispatch({ type: GET_USERINFO_FAILED });
            });*/
    }
}

export const updateUserInfo = (params) => {
    return (dispatch) => {

        dispatch({ type: LOGIN_START });

        const uid = params.payload.uid;
        const payload = params.payload;
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

            }).catch(() => {
                //console.log('USER INFO not updated');
                dispatch({ type: LOGIN_FAILED });
            });
    }
}