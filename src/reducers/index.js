import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  userReducer,
  postReducer,
  taskReducer
});