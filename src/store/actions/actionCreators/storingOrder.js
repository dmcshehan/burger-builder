import * as actionTypes from "../actionTypes/index";
import axios from "../../../axios-orders";

const purchaseOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const purchaseOrderFailed = error => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAILED,
    error: error
  };
};

export const purchaseOrder = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseOrderStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseOrderSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseOrderFailed(error));
      });
  };
};

export const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_INIT
  };
};

export const onPurchaseOrderClear = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_CLEAR
  };
};
