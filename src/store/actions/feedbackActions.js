import axios from 'axios';
import api from '../../config/axios';
import {GET_FEEDBACK,ADD_FEEDBACK} from './types';

export const getFeedback = () => async dispatch => {
  try {
    const res = await api.get('/feedback');
    dispatch({
      type: GET_FEEDBACK,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: FEEDBACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const addFeedback = (feedbackData) => async dispatch => {
  try {
    const res = await api.post('/feedback', feedbackData);
    dispatch({
      type: ADD_FEEDBACK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
    console.error(err);
  }
};