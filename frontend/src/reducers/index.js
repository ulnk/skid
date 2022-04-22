import { combineReducers } from 'redux';

import server from './server.js';
import category from './category.js';
import channel from './channel.js';
import message from './message.js';

import invite from './invite.js';
import user from './message.js';
import notify from './notify.js';
import other from './other.js';

export default combineReducers({
    user
    // server, category, channel, message, invite, user, notify, other
});