import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators/index";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).reduce((previous, key) => {
      return previous + ingredients[key];
    }, 0);

    return sum > 0;
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.error) {
      burger = (
        <p style={{ textAlign: "center" }}>Ingredients cannot fe fetched!</p>
      );
    }

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          price={this.props.price}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice.toFixed(2),
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onIngredientAdded: ingName =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
