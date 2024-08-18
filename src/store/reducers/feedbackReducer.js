import { GET_FEEDBACK, ADD_FEEDBACK, FEEDBACK_ERROR } from '../actions/types';

const initialState = {
  feedbacks: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEEDBACK:
      return {
        ...state,
        feedbacks: payload,
        loading: false
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbacks: [payload, ...state.feedbacks],
        loading: false
      };
    case FEEDBACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}