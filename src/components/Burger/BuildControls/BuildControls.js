import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>${props.price}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
