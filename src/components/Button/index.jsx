import React from "react";

const Button = ({ type, name, onClick, className }) => {
  return (
    <button type={type | "button"} className={className} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
