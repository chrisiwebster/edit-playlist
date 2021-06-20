import React from "react";
import "./styles.css";

const Header = ({ title, children }) => {
  return (
    <div>
      {children}
      <header>
        <h1>{title}</h1>
      </header>
    </div>
  );
};

export default Header;
