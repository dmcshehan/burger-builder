import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/actionCreators/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersFetch(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (this.props.orders) {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.key}
            price={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    } else {
      orders = <h3>Please Order a burger!</h3>;
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.fetchingOrders.orders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispachToProps = dispatch => {
  return {
    onOrdersFetch: (token, userId) =>
      dispatch(actionCreators.onFetchOrdersInit(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(withErrorHandler(Orders, axios));
