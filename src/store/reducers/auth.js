import * as actionTypes from "../actions/actionTypes/auth";
import returnObject from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return returnObject(state, { loading: true, error: null });

    case actionTypes.AUTH_SUCCESS:
      let newObject = {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
      };

      return returnObject(state, newObject);

    case actionTypes.AUTH_FAIL:
      return returnObject(state, {
        loading: false,
        error: action.error
      });

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };

    default:
      return state;
  }
};

export default reducer;
