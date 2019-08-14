import * as actionTypes from "../actionTypes/index";
import axios from "../../../axios-orders";

const onFetchOrdersSuccess = payload => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: payload
  };
};

const onFetchOrdersFail = err => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: err
  };
};

const onFetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const onFetchOrdersInit = (token, userId) => {
  return dispatch => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    dispatch(onFetchOrdersStart());
    axios
      .get(`/orders.json${queryParams}`)
      .then(response => {
        let ordersArray = [];

        for (let key in response.data) {
          ordersArray.push({ ...response.data[key], key: key });
        }

        dispatch(onFetchOrdersSuccess(ordersArray));
      })
      .catch(error => {
        dispatch(onFetchOrdersFail(error));
      });
  };
};
