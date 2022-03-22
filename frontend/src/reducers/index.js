import { combineReducers } from 'redux';

import auth from './auth.js';
import servers from './servers.js';

export default combineReducers({
    auth, servers
})