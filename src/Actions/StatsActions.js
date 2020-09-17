import {
    GET_POMODORO_STATS_START,
    GET_POMODORO_STATS_SUCCESS,
    GET_POMODORO_STATS_FAILED,

    GET_ACHIEVEMENT_LIST_START,
    GET_ACHIEVEMENT_LIST_SUCCESS,
    GET_ACHIEVEMENT_LIST_FAILED
} from './types'

import firestore from '@react-native-firebase/firestore';
import { getDailyPomodoro } from './MainPageActions';


export const getDailyPomodoroForStats = (params) => {
    console.log(params.userid)
    return (dispatch) => {
        firestore()
            .collection('DailyPomodoro')
            .doc(params.userid)
            .get()
            .then((dailyPomodoro) => {
                console.log('Gelen Data: ', dailyPomodoro);
                dispatch({ type: GET_POMODORO_STATS_SUCCESS, payload: dailyPomodoro })
            }).catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({ type: GET_POMODORO_STATS_FAILED })
            })
    }
}

export const getAchievementList = () => {
    return (dispatch) => {
        firestore()
            .collection('AchievementList')
            .doc('HtbapZJNgtQQ1khCWewc')
            .get()
            .then((achievementList) => {
                // console.log('Gelen Data: ', achievementList._data.AchievementArray);
                let data = [];
                achievementList._data.AchievementArray.forEach((arr) => {
                    data.push(arr)
                });
                // console.log('daya', data)
                dispatch({ type: GET_ACHIEVEMENT_LIST_SUCCESS, payload: data })
            }).catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({ type: GET_ACHIEVEMENT_LIST_FAILED })
            })

    }
}



export const getDailyPomodoroForStatsTest = (params) => {
    console.log(params.userid)
    return (dispatch) => {
        firestore()
            .collection('DailyPomodoroTest')
            .doc(params.userid)
            .get()
            .then((dailyPomodoro) => {
                // console.log('Gelen Data: ', dailyPomodoro._data.DailyWorkArray);

                let timeStampArray = dailyPomodoro._data.DailyWorkArray;
                let dateArray = [];

                var arr = timeStampArray.filter(function (el) {
                    if (dateArray.indexOf(el.toDate().toLocaleDateString()) == -1) {
                        dateArray.push(el.toDate().toLocaleDateString());
                        return true;
                    }

                    return false;

                });
                console.log('dateArrauy', dateArray)
                dispatch({ type: GET_POMODORO_STATS_SUCCESS, payload: dateArray })
            }).catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({ type: GET_POMODORO_STATS_FAILED })
            })
    }
}


