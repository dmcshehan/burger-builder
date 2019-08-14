import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import "./index.css";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Logout from "./Auth/Logout/Logout";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import * as actionCreators from "./store/actions/actionCreators/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const asyncCheckout = asyncComponent(() => {
      return import("./containers/Checkout/Checkout");
    });

    const asyncOrders = asyncComponent(() => {
      return import("./containers/Orders/Orders");
    });

    const asyncAuth = asyncComponent(() => {
      return import("./Auth/Auth");
    });

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.checkAuthStatus())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
