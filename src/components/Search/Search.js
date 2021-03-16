import React, { Component } from "react";
import "./Search.css";

class Search extends React.Component {
  render() {
    return (
      <form //Will add an action here to go to the API
      >
        <input id="search" type="text" placeholder="Search for songs"></input>
        <button for="search">Go</button>
      </form>
    );
  }
}

export default Search;
