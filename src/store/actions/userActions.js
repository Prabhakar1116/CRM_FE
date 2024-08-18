import api from '../../config/axios';
import { GET_USERS, UPDATE_USER, DELETE_USER, USER_ERROR, UPDATE_USER_PROFILE, ADD_USER } from './types';

export const addUser = (userData) => async dispatch => {
  try {
    const res = await api.post('/user', userData);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await api.get('/user');
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateUser = (id, userData) => async dispatch => {
  try {
    const res = await api.put(`/user/${id}`, userData);
    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateUserProfile = (userData) => async dispatch => {
  try {
    const res = await api.put('/user/profile', userData);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteUser = (id) => async dispatch => {
  try {
    await api.delete(`/user/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (err) {
    console.error('Error deleting user:', err.response?.data || err.message);
    dispatch({
      type: USER_ERROR,
      payload: { 
        msg: err.response?.data?.message || 'Error deleting user', 
        status: err.response?.status 
      }
    });
  }
};