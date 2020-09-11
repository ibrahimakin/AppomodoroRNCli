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
} from '../Actions/types';

const INITIAL_STATE = {
    loadingMainPage: false,
    dailyPomodoro: null
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_DAILY_POMODORO_START:
            return {
                ...state,
                loadingMainPage: true,
            };


        case GET_DAILY_POMODORO_FOR_ONCE_SUCCESS:
        case GET_DAILY_POMODORO_SUCCESS:
            return {
                ...state,
                loadingMainPage: false,
                dailyPomodoro: action.payload
            };

        case GET_DAILY_POMODORO_FOR_ONCE_FAILED:
        case GET_DAILY_POMODORO_FAILED:
            return {
                ...state,
                loadingMainPage: false,
            };



        case ADD_DAILY_POMODORO_START:
            return {
                ...state,
                loadingMainPage: true,
            };


        case ADD_DAILY_POMODORO_SUCCESS:
            return {
                ...state,
                loadingMainPage: false,
                dailyPomodoro: action.payload
            };

        case ADD_DAILY_POMODORO_FAILED:
            return {
                ...state,
                loadingMainPage: false,
            };


        default:
            return state;
    }
};