import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators/index";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.authLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
