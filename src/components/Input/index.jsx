import React from "react";

const Input = ({
  type,
  label,
  placeholder,
  children,
  onChange,
  onBlur,
  id,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {children}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  id: 1,
  placeholder: "Enter here",
};

export default Input;
