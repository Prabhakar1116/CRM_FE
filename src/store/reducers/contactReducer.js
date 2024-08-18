import {
    GET_CONTACTS,
    GET_USER_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT
  } from '../actions/types';
  
  const initialState = {
    contacts: [],
    loading: true
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CONTACTS:
        return {
          ...state,
          contacts: action.payload,
          loading: false
        };

        case GET_USER_CONTACTS:
        return {
          ...state,
          contacts: action.payload,
          loading: false
        };
      case ADD_CONTACT:
        return {
          ...state,
          contacts: [action.payload, ...state.contacts],
          loading: false
        };
      case UPDATE_CONTACT:
        return {
          ...state,
          contacts: state.contacts.map(contact =>
            contact._id === action.payload._id ? action.payload : contact
          ),
          loading: false
        };
      case DELETE_CONTACT:
        return {
          ...state,
          contacts: state.contacts.filter(contact => contact._id !== action.payload),
          loading: false
        };
      default:
        return state;
    }
  }