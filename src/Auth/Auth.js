import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../store/actions/actionCreators/index";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import returnObject from "../shared/utility";
import checkValidity from "../shared/checkValidity";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // const updatedControlForm = {
    //   ...this.state.controls,
    //   [inputIdentifier]: {
    //     ...this.state.controls[inputIdentifier],
    //     value: event.target.value,
    //     valid: this.checkValidity(
    //       event.target.value,
    //       this.state.controls[inputIdentifier].validation
    //     ),
    //     touched: true
    //   }
    // };

    const updatedControlForm = returnObject(this.state.controls, {
      [inputIdentifier]: returnObject(this.state.controls[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true
      })
    });

    this.setState({
      controls: updatedControlForm
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  authModeChangeHandler = () => {
    this.setState({
      isSignup: !this.state.isSignup
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== null) {
      this.props.setAuthRedirectPath();
    }
  }

  render() {
    let orderFormArray = [];
    for (let key in this.state.controls) {
      orderFormArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {orderFormArray.map(formElement => {
          return (
            <Input
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event => {
                this.inputChangedHandler(event, `${formElement.id}`);
              }}
            />
          );
        })}
        <Button btnType="Success">
          {this.state.isSignup ? "SIGNUP" : "SIGNIN"}
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p style={{ color: "red" }}>ll{this.props.error.message}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button clicked={this.authModeChangeHandler} btnType="Danger">
          Switch To {this.state.isSignup ? "Signin" : "Signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    setAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
