import { GET_COMMUNICATIONS, ADD_COMMUNICATION, UPDATE_COMMUNICATION, DELETE_COMMUNICATION, GET_QUERIES, GET_QUERIES_BY_CUSTOMER, RAISE_QUERY } from "../actions/types";

const initialState = {
  communications: [],
  queries: [],
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
            communication._id === action.payload._id ? action.payload : communication
          ),
          queries: state.queries.map((query) =>
            query._id === action.payload._id ? action.payload : query
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
      case GET_QUERIES:
        case GET_QUERIES_BY_CUSTOMER:
      return {
        ...state,
        queries: action.payload,
        loading: false,
      };
    case RAISE_QUERY:
          return {
            ...state,
            queries: [action.payload, ...state.queries],
        loading: false,
      };
    default:
      return state;
  }
}
