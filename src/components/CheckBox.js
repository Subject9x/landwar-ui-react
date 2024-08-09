import React from "react";

const Checkbox = ({ id, type, name, handleOnChange, isChecked, disable}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleOnChange}
      checked={isChecked}
      disabled={disable}
    />
  );
};

export default Checkbox;
