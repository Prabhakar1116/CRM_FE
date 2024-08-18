import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: { ...notification, id: Date.now() }
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});