import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux";

const SideDrawer = props => {
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div
        className={[
          classes.SideDrawer,
          props.open ? classes.Open : classes.Close
        ].join(" ")}
        onClick={props.closed}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems {...props} isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
