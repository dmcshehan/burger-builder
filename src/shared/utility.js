const returnObject = (state, newObject) => {
  return {
    ...state,
    ...newObject
  };
};

export default returnObject;
