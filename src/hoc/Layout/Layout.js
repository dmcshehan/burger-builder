import React, { Component } from "react";
import Aux from "../Aux/Aux";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawe: false
  };

  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawe: true
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawe: false
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          open={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          {...this.props}
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawe}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
