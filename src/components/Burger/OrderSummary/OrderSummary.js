import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //This is a functional component, dont need to be a class
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      ingredientKey => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>{" "}
            : {this.props.ingredients[ingredientKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : $ {this.props.price}</strong>
        </p>
        <Button clicked={this.props.cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
