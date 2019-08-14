import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators/index";

class Checkout extends Component {
  state = {
    ingredients: {}
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.onPurchaseOrderClear();
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={props => {
              return <ContactData {...props} />;
            }}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPurchaseOrderClear: () => dispatch(actionCreators.onPurchaseOrderClear())
  };
};

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
