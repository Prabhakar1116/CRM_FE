import api from '../../config/axios';
import {GET_COMMUNICATIONS, ADD_COMMUNICATION, UPDATE_COMMUNICATION, DELETE_COMMUNICATION, GET_CUSTOMERS} from './types';

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
  } catch (err) {
    console.error(err);
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