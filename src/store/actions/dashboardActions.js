import api from '../../config/axios';
import { GET_USER_DASHBOARD_DATA, DASHBOARD_ERROR, GET_POPULAR_TEXTILE_CHOICES, GET_FOLLOW_UP_ACTIONS, GET_TASKS_DUE, GET_TOTAL_CUSTOMERS, GET_NEW_CUSTOMERS_THIS_MONTH, GET_TOP_SPENDING_CUSTOMER} from './types';

export const getUserDashboardData = () => async dispatch => {
  try {
    
    const res = await api.get('/dashboard/user');
    
    dispatch({
      type: GET_USER_DASHBOARD_DATA,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};

export const getPopularTextileChoices = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/populartextilechoices');
    dispatch({
      type: GET_POPULAR_TEXTILE_CHOICES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};

export const getFollowUpActions = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/followupactions');
    dispatch({
      type: GET_FOLLOW_UP_ACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};

export const getTasksDue = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/tasksdue');
    dispatch({
      type: GET_TASKS_DUE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};

export const getTotalCustomers = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/totalcustomers');
    dispatch({
      type: GET_TOTAL_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};



export const getNewCustomersThisMonth = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/newcustomersthismonth');
    dispatch({
      type: GET_NEW_CUSTOMERS_THIS_MONTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};

export const getTopSpendingCustomer = () => async dispatch => {
  try {
    const res = await api.get('/dashboard/topspendingcustomer');
    dispatch({
      type: GET_TOP_SPENDING_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response?.data?.message || err.message || 'Server Error', status: err.response?.status }
    });
  }
};