import * as actionTypes from "../actionTypes/auth";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: data.idToken,
    userId: data.userId
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
      process.env.REACT_APP_API_KEY
    }`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
        process.env.REACT_APP_API_KEY
      }`;
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthStatus = () => {
  return dispatch => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (new Date() > expirationDate) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(
          authSuccess({
            idToken: token,
            userId: userId
          })
        );

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
