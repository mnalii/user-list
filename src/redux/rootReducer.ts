import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/user';

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux',
  whitelist: [],
};

export const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['users'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export default rootReducer;
