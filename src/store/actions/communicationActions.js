import api from '../../config/axios';
import {GET_COMMUNICATIONS, ADD_COMMUNICATION, UPDATE_COMMUNICATION, DELETE_COMMUNICATION, GET_CUSTOMERS, GET_QUERIES, GET_QUERIES_BY_CUSTOMER, RAISE_QUERY} from './types';

export const getCommunications = () => async dispatch => {
  try {
    const res = await api.get('/communication');
    dispatch({
      type: GET_COMMUNICATIONS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getCustomers = () => async dispatch => {
  try {
    const res = await api.get('/customer');
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const addCommunication = (communicationData) => async dispatch => {
  try {
    const res = await api.post('/communication', communicationData);
    dispatch({
      type: ADD_COMMUNICATION,
      payload: res.data
    });
  } catch (err) {
    console.error('Error adding communication:', err.response?.data || err.message);
  }
};

export const updateCommunication = (id, communicationData) => async dispatch => {
  try {
    const res = await api.put(`/communication/${id}`, communicationData);
    dispatch({
      type: UPDATE_COMMUNICATION,
      payload: res.data
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
export const deleteCommunication = (id) => async dispatch => {
  try {
    await api.delete(`/communication/${id}`);
    dispatch({
      type: DELETE_COMMUNICATION,
      payload: id
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQueries = () => async dispatch => {
  try {
    const res = await api.get('/communication/queries');
    dispatch({
      type: GET_QUERIES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQueriesByCustomer = (customerId) => async dispatch => {
  try {
    const res = await api.get(`/communication/queries/${customerId}`);
    dispatch({
      type: GET_QUERIES_BY_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const raiseQuery = (queryData) => async dispatch => {
  try {
    const res = await api.post('/communication', { ...queryData, type: 'query' });
    dispatch({
      type: RAISE_QUERY,
      payload: res.data
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.error('Error raising query:', err.response?.data || err.message);
    return Promise.reject(err);
  }
};