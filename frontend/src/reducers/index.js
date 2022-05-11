import { combineReducers } from 'redux';

import server from './server.js';
import category from './category.js';
import channel from './channel.js';
import message from './message.js';
import friend from './friend';

import invite from './invite.js';
import user from './user.js';
import notify from './notify.js';
import errors from './errors.js';
import other from './other.js';

export default combineReducers({
    server, category, channel, message, invite, user, notify, other, errors, friend
});