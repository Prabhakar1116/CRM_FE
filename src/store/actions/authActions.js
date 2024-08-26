import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import api from '../../config/axios';
import { getUserContacts } from './contactActions';
import { toast } from 'react-toastify';

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    toast.info('Logging in...', { autoClose: false, toastId: 'loginLoading' });
    const res = await api.post('/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    const user = await api.get('/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: user.data
    });

    // Fetch user contacts after successful login
    dispatch(getUserContacts());

    toast.dismiss('loginLoading');
    toast.success('Logged in successfully');

    if (user.data.role === 'admin') {
      return '/';
    } else {
      return '/userdashboard';
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    toast.dismiss('loginLoading');
    toast.error('Login failed. Please check your credentials.');
    throw err;
  }
};
// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    dispatch(getUserContacts()); // Add this line
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password, role }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    toast.info('Registering...', { autoClose: false, toastId: 'registerLoading' });
    const res = await api.post('/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    const user = await api.get('/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: user.data
    });

    toast.dismiss('registerLoading');
    toast.success('Registered successfully');

    if (user.data.role === 'admin') {
      return '/';
    } else {
      return '/userdashboard';
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    toast.dismiss('registerLoading');
    toast.error('Registration failed. Please try again.');
    throw err;
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  toast.success('Logged out successfully');
  return '/login'; 
};