import * as actionTypes from "../actions/actionTypes/index";
import returnObject from "../../shared/utility";

const initialState = {
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER_INIT:
      return returnObject(state, { purchased: true });

    case actionTypes.PURCHASE_ORDER_START:
      return returnObject(state, { loading: true });

    case actionTypes.PURCHASE_ORDER_SUCCESS:
      return returnObject(state, { loading: false });

    case actionTypes.PURCHASE_ORDER_FAILED:
      return returnObject(state, { loading: false });

    case actionTypes.PURCHASE_ORDER_CLEAR:
      return returnObject(state, { purchased: false });

    default:
      return state;
  }
};

export default reducer;
