import * as actionTypes from "../actions/actionTypes/index";
import returnObject from "../../shared/utility";

const initialState = {
  orders: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_SUCCESS:
      return returnObject(state, { orders: action.orders, loading: false });

    case actionTypes.FETCH_ORDER_FAIL:
      return returnObject(state, { loading: false });

    case actionTypes.FETCH_ORDER_START:
      return returnObject(state, { loading: true });

    default:
      return state;
  }
};

export default reducer;
