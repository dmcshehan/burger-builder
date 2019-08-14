import * as actionTypes from "../actionTypes/index";
import axios from "../../../axios-orders";

const setIngredients = ings => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings
  };
};

const setIngredientsFailed = err => {
  return {
    type: actionTypes.SET_INGREDIENTS_FAIED,
    error: err
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(
          setIngredients({
            salad: response.data.salad,
            bacon: response.data.bacon,
            cheese: response.data.cheese,
            meat: response.data.meat
          })
        );
      })
      .catch(error => {
        dispatch(setIngredientsFailed(error));
      });
  };
};

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};
