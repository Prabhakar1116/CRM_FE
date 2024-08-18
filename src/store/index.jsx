import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import customerReducer from './reducers/customerReducer';
import contactReducer from './reducers/contactReducer';
import communicationReducer from './reducers/communicationReducer';
import feedbackReducer from './reducers/feedbackReducer';
import reportReducer from './reducers/reportReducer';
import userReducer from './reducers/userReducer';
import dashboardReducer from './reducers/dashboardReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customerReducer,
  contacts: contactReducer,
  communications: communicationReducer,
  feedback: feedbackReducer,
  reports: reportReducer,
  users: userReducer,
  dashboard: dashboardReducer,
  notifications: notificationReducer

});

const store = configureStore({
  reducer: rootReducer
});

export default store;