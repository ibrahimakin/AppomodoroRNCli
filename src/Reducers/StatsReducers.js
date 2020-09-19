import {
    GET_POMODORO_STATS_START,
    GET_POMODORO_STATS_SUCCESS,
    GET_POMODORO_STATS_FAILED,

    GET_ACHIEVEMENT_LIST_START,
    GET_ACHIEVEMENT_LIST_SUCCESS,
    GET_ACHIEVEMENT_LIST_FAILED,

    GET_POMODORO_STATS_GRAPH_START,
    GET_POMODORO_STATS_GRAPH_SUCCESS,
    GET_POMODORO_STATS_GRAPH_FAILED
} from '../Actions/types';

const INITIAL_STATE = {
    loadingStats: false,
    dailyPomodoroForStats: null,
    dailyPomodoroForGraph: null,
    achievementList: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_POMODORO_STATS_START:
            return {
                ...state,
                loadingStats: true,
            };


        case GET_POMODORO_STATS_SUCCESS:
            return {
                ...state,
                loadingStats: false,
                dailyPomodoroForStats: action.payload
            };

        case GET_POMODORO_STATS_FAILED:
            return {
                ...state,
                loadingStats: false,
            };


        case GET_POMODORO_STATS_GRAPH_START:
            return {
                ...state,
                loadingStats: true,
            };


        case GET_POMODORO_STATS_GRAPH_SUCCESS:
            return {
                ...state,
                loadingStats: false,
                dailyPomodoroForGraph: action.payload
            };

        case GET_POMODORO_STATS_GRAPH_FAILED:
            return {
                ...state,
                loadingStats: false,
            };


        case GET_ACHIEVEMENT_LIST_START:
            return {
                ...state,
                loadingStats: true,
            };


        case GET_ACHIEVEMENT_LIST_SUCCESS:
            return {
                ...state,
                loadingStats: false,
                achievementList: action.payload
            };

        case GET_ACHIEVEMENT_LIST_FAILED:
            return {
                ...state,
                loadingStats: false,
            };

        default:
            return state;
    }
};