import { GET_USERS, UPDATE_USER, DELETE_USER, USER_ERROR, UPDATE_USER_PROFILE } from '../actions/types';

const initialState = {
  users: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}