import { GET_SALES_REPORT, GET_CONVERSION_RATES, GET_ADMIN_REPORTS, GET_SALES_OVER_TIME, REPORT_ERROR, GET_TEXTILE_SPECIFIC_REPORT } from "../actions/types";

const initialState = {
  salesReport: [],
  conversionRates: {},
  loading: true,
  error: {},
  adminReports: [],
  salesOverTime: [],
  textileSpecificReport: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_REPORTS:
      return {
        ...state,
        adminReports: action.payload,
        loading: false,
      };
    case GET_SALES_OVER_TIME:
      return {
        ...state,
        salesOverTime: action.payload,
        loading: false,
      };
    case REPORT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SALES_REPORT:
      return {
        ...state,
        salesReport: action.payload,
        loading: false,
      };
    case GET_TEXTILE_SPECIFIC_REPORT:
      console.log('Received textile specific report:', action.payload);
      return {
        ...state,
        textileSpecificReport: action.payload,
        loading: false,
      };
    case GET_CONVERSION_RATES:
      return {
        ...state,
        conversionRates: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
