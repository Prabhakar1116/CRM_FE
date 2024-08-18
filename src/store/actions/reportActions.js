import axios from 'axios';
import api from '../../config/axios';
import {GET_SALES_REPORT,GET_CONVERSION_RATES,GET_ADMIN_REPORTS,GET_SALES_OVER_TIME,REPORT_ERROR,GET_TEXTILE_SPECIFIC_REPORT} from './types';

export const getSalesReport = (startDate, endDate) => async dispatch => {
  try {
    const res = await api.get(`/report/sales?startDate=${startDate}&endDate=${endDate}`);
    dispatch({
      type: GET_SALES_REPORT,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getConversionRates = () => async dispatch => {
  try {
    const res = await api.get('/report/conversion-rates');
    dispatch({
      type: GET_CONVERSION_RATES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAdminReports = () => async dispatch => {
  try {
    const res = await api.get('/report/admin');
    dispatch({
      type: GET_ADMIN_REPORTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getSalesOverTime = (timeRange) => async dispatch => {
  try {
    const res = await api.get(`/report/sales-over-time?range=${timeRange}`);
    dispatch({
      type: GET_SALES_OVER_TIME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getTextileSpecificReport = (dateRange) => async dispatch => {
  try {
    console.log('Fetching textile specific report with:', dateRange);
    const res = await api.get(`/report/textile-specific?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
    console.log('API response:', res.data);
    dispatch({
      type: GET_TEXTILE_SPECIFIC_REPORT,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching textile specific report:', err);
    dispatch({
      type: REPORT_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};