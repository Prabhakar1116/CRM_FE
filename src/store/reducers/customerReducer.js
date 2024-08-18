import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    ADD_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    CUSTOMER_ERROR,
    ADD_FOLLOW_UP_ACTION
  } from '../actions/types';
  
  const initialState = {
    customers: [],
    customer: null,
    loading: true
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload,
          loading: false
        };
      case GET_CUSTOMER:
        return {
          ...state,
          customer: action.payload,
          loading: false
        };
      case ADD_CUSTOMER:
        return {
          ...state,
          customers: [action.payload, ...state.customers],
          loading: false
        };
      case UPDATE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.map(customer =>
            customer._id === action.payload._id ? action.payload : customer
          ),
          loading: false
        };
      case DELETE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.filter(customer => customer._id !== action.payload),
          loading: false
        };
      case CUSTOMER_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case ADD_FOLLOW_UP_ACTION:
        return {
          ...state,
          customer: { ...state.customer, followUpActions: [action.payload, ...state.customer.followUpActions] },
          loading: false
        };
      default:
        return state;
    }
  }