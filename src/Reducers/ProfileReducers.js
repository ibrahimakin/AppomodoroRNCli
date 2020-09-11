import { ADD_USERINFO_START, ADD_USERINFO_SUCCESS, ADD_USERINFO_FAILED, GET_USERINFO_START, GET_USERINFO_SUCCESS, GET_USERINFO_FAILED, UPDATE_USERINFO_START, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILED } from '../Actions/types';

const INITIAL_STATE = {
    loading: false,
    data: null,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USERINFO_START:
            return {
                ...state, loading: true
            };
        case UPDATE_USERINFO_SUCCESS:
            return {
                ...state, data: action.payload
            };
        case UPDATE_USERINFO_FAILED:
            return {
                ...state, loading: true
            };
        default:
            return state;
    }
};