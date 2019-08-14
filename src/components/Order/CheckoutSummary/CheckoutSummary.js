import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div
        style={{
          width: "100%"
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
