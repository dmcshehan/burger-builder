import React from "react";
import classes from "./Order.css";

const Order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key]
    });
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients :{" "}
        {ingredients.map(ing => {
          return (
            <span
              key={ing.name}
              style={{
                textTransform: "capitalize",
                border: "2px solid #eee",
                display: "inline-block",
                margin: "0 8px",
                padding: "3px"
              }}
            >
              {ing.name}({ing.amount})
            </span>
          );
        })}
      </p>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
