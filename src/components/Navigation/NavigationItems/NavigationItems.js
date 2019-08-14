import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "../NavigationItems/NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Buider</NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Authentiicate</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
