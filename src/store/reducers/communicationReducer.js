import { GET_COMMUNICATIONS, ADD_COMMUNICATION, UPDATE_COMMUNICATION, DELETE_COMMUNICATION } from "../actions/types";

const initialState = {
  communications: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNICATIONS:
      return {
        ...state,
        communications: action.payload,
        loading: false,
      };
    case ADD_COMMUNICATION:
      return {
        ...state,
        communications: [action.payload, ...state.communications],
        loading: false,
      };
    case UPDATE_COMMUNICATION:
      return {
        ...state,
        communications: state.communications.map((communication) =>
          communication._id === action.payload._id
            ? action.payload
            : communication
        ),
        loading: false,
      };
    case DELETE_COMMUNICATION:
      return {
        ...state,
        communications: state.communications.filter(
          (communication) => communication._id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
}
