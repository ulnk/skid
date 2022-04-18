import { combineReducers } from 'redux';

import auth from './auth.js';
import servers from './servers.js';
import notify from './notify.js';
import external from './external.js'

export default combineReducers({
    auth, servers, notify, external
})