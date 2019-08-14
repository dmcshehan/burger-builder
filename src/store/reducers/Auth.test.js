import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes/auth";

describe("should return initial state", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: "/"
    });
  });

  it("should store token", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: null,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: "some-token",
          userId: "some-id"
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
