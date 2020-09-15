import {
    GET_DAILY_POMODORO_START,
    GET_DAILY_POMODORO_SUCCESS,
    GET_DAILY_POMODORO_FAILED,

    GET_DAILY_POMODORO_FOR_ONCE_START,
    GET_DAILY_POMODORO_FOR_ONCE_SUCCESS,
    GET_DAILY_POMODORO_FOR_ONCE_FAILED,

    ADD_DAILY_POMODORO_START,
    ADD_DAILY_POMODORO_SUCCESS,
    ADD_DAILY_POMODORO_FAILED
} from './types'

import firestore from '@react-native-firebase/firestore';



export const getDailyPomodoro = (params) => {
    return (dispatch) => {
        dispatch({ type: GET_DAILY_POMODORO_START });
        firestore().collection('DailyPomodoro')
            .doc(params.userid)
            .collection(params.date)
            .onSnapshot(dailyPomodoro => {
                // console.log('dailyPomodoro', dailyPomodoro)
                dispatch({ type: GET_DAILY_POMODORO_SUCCESS, payload: dailyPomodoro.docs[0] ? dailyPomodoro._docs[0]._data : null });
            })
    }
}

export const getDailyPomodoroForOnce = () => {
    return (dispatch) => {
        firestore()
            .collection('DailyPomodoro')
            .doc('UWi5eo1OQuXhamyb8eHN6o702353')
            .collection('05092020')
            .get().then((dailyPomodoro) => {
                // console.log('Gelen Data: ', dailyPomodoro);
                dispatch({ type: GET_DAILY_POMODORO_FOR_ONCE_SUCCESS, payload: dailyPomodoro._docs[0]._data })
            }).catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({ type: GET_DAILY_POMODORO_FOR_ONCE_FAILED })
            })
    }
}

export const addDailyPomodoro = (params) => {
    return (dispatch) => {
        dispatch({ type: ADD_DAILY_POMODORO_START });
        // console.log('paraaam', params)
        firestore()
            .collection('DailyPomodoro')
            .doc(params.userid)
            .collection(params.date)
            .add({
                dailywork: params.daily,
            })
            .then(() => {
                console.log('Daily work updated');
                dispatch({ type: ADD_DAILY_POMODORO_SUCCESS })

            }).catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({ type: ADD_DAILY_POMODORO_FAILED })
            });
    }
}


// export const addDailyPomodoroTest = (params) => {
//     return (dispatch) => {
//         dispatch({ type: ADD_DAILY_POMODORO_START });
//         // console.log('paraaam', params)
//         firestore()
//             .collection('DailyPomodoroTest')
//             .doc(params.userid)
//             .collection('TotalWork')
//             .set(
//                 { TotalWork: [{ who: "third@test.com", when: new Date() }] },
//                 { merge: true }
//               )
//             .then(() => {
//                 console.log('Daily work updated');
//                 dispatch({ type: ADD_DAILY_POMODORO_SUCCESS })

//             }).catch((err) => {
//                 console.log('Read Data error: ', err);
//                 dispatch({ type: ADD_DAILY_POMODORO_FAILED })
//             });
//     }
// }
