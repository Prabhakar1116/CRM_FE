import { GET_USER_DASHBOARD_DATA, DASHBOARD_ERROR, GET_FOLLOW_UP_ACTIONS, GET_TASKS_DUE, GET_TOTAL_CUSTOMERS, GET_NEW_CUSTOMERS_THIS_MONTH, GET_TOP_SPENDING_CUSTOMER, GET_POPULAR_TEXTILE_CHOICES, GET_MONTHLY_SALES } from '../actions/types';

const initialState = {
  recentCustomers: [],
  recentCommunications: [],
  tasksDue: [],
  popularTextileChoices: [],
  monthlySales: [],
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_FOLLOW_UP_ACTIONS:
      return {
        ...state,
        followUpActions: action.payload
      };
    case GET_TASKS_DUE:
      return {
        ...state,
        tasksDue: action.payload
      };
    case GET_TOTAL_CUSTOMERS:
      return {
        ...state,
        totalCustomers: action.payload
      };
    case GET_NEW_CUSTOMERS_THIS_MONTH:
      return {
        ...state,
        newCustomersThisMonth: action.payload
      };
    case GET_TOP_SPENDING_CUSTOMER:
      return {
        ...state,
        topSpendingCustomer: action.payload
      };
    case GET_POPULAR_TEXTILE_CHOICES:
      return {
        ...state,
        popularTextileChoices: action.payload
      };
    case GET_MONTHLY_SALES:
      return {
        ...state,
        monthlySales: action.payload
      };
      
    default:
      return state;
  }
}