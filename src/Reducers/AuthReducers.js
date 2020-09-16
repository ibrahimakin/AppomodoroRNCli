import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED,
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED,
    SIGNOUT_SUCCESS
} from '../Actions/types';

const INITIAL_STATE = {
    loading: false,
    user: null
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case LOGIN_FAILED:
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
            };
        case SIGNOUT_SUCCESS:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};