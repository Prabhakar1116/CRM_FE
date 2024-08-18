import axios from 'axios';
import api from '../../config/axios';
import {GET_CONTACTS,ADD_CONTACT,UPDATE_CONTACT,DELETE_CONTACT,GET_CUSTOMERS,GET_USER_CONTACTS, CONTACT_ERROR} from './types';

export const getContacts = () => async dispatch => {
  try {
    const res = await api.get('/contact');
    dispatch({
      type: GET_CONTACTS,
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

export const addContact = (contactData) => async dispatch => {
  try {
    const res = await api.post('/contact', contactData);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserContacts = () => async dispatch => {
  try {
    const res = await api.get('/contact/user');
    dispatch({
      type: GET_USER_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateContact = (id, contactData) => async dispatch => {
  try {
    const res = await api.put(`/contact/${id}`, contactData);
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteContact = (id) => async dispatch => {
  try {
    await api.delete(`/contact/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (err) {
    console.error(err);
  }
};