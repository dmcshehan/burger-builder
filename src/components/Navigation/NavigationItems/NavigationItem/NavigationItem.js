import React from "react";
import classes from "./NavigationItem.css";
import { NavLink, withRouter } from "react-router-dom";

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} to={props.link} exact>
        {props.children}
      </NavLink>
    </li>
  );
};

export default withRouter(NavigationItem);
