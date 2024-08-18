import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
}