import React from "react";
import "./Header.css";

//use this colour wheel https://color.adobe.com/create/color-wheel

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
