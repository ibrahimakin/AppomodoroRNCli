import { combineReducers } from 'redux';

import AuthReducers from './AuthReducers';
import ProfileReducers from './ProfileReducers';
import MainPageReducers from './MainPageReducers';
import StatsReducers from './StatsReducers';

export default combineReducers({
    authResponse: AuthReducers,
    profileResponse: ProfileReducers,
    mainPageResponse: MainPageReducers,
    statsResponse: StatsReducers,
});