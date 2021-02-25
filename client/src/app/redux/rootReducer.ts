import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../../features/counter/counterSlice';
import authReducer from '../../features/auth/authSlice';
import alertReducer from '../cores/alert/alertSlice';
import drawerReducer from '../cores/drawer/drawerSlice';
import modalReducer from '../cores/modal/modalSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  alert: alertReducer,
  drawer: drawerReducer,
  modal: modalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type CounterState = ReturnType<typeof counterReducer>;
export type AuthState = ReturnType<typeof authReducer>;
export type AlertState = ReturnType<typeof alertReducer>;
export type DrawerState = ReturnType<typeof drawerReducer>;
export type ModalState = ReturnType<typeof modalReducer>;

export default rootReducer;
