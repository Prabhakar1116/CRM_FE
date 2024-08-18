import axios from 'axios';
import api from '../../config/axios';
import {GET_CUSTOMERS,GET_CUSTOMER,ADD_CUSTOMER,UPDATE_CUSTOMER,DELETE_CUSTOMER, CUSTOMER_ERROR, ADD_FOLLOW_UP_ACTION} from './types';

// Get all customers
export const getCustomers = () => async dispatch => {
  try {
    const res = await api.get('/customer');
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: {msg: err.response.data.msg, status: err.response.status}
    });
    console.error(err);
  }
};

// Add new customer
export const addCustomer = (customerData) => async dispatch => {
  try {
    const res = await api.post('/customer', customerData);
    dispatch({
      type: ADD_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: {msg: err.response.data.msg, status: err.response.status}
    });
    console.error(err);
  }
};

// Get single customer
export const getCustomer = (id) => async dispatch => {
  try {
    const res = await api.get(`/customer/${id}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update customer
export const updateCustomer = (id, customerData) => async dispatch => {
  try {
    const res = await api.put(`/customer/${id}`, customerData);
    dispatch({
      type: UPDATE_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: {msg: err.response.data.msg, status: err.response.status}
    });
    console.error(err);
  }
};

// Delete customer
export const deleteCustomer = (id) => async dispatch => {
  try {
    await api.delete(`/customer/${id}`);
    dispatch({
      type: DELETE_CUSTOMER,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: {msg: err.response.data.msg, status: err.response.status}
    });
    console.error(err);
  }
};

// Add Followup Action
export const addFollowUpAction = (customerId, action) => async dispatch => {
  try {
    const res = await api.post(`/followup/send`, { customerId, ...action });
    dispatch({
      type: ADD_FOLLOW_UP_ACTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};
