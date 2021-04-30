import React from "react";
import "./Search.css";

const id = "54d03dd971f04b3e971ec3ffa241645c";
const redirect = "http://localhost:3000/";
const auth = () => {
  const response = fetch(
    `https://accounts.spotify.com/authorize?client_id=${id}&response_type=code&redirect_uri=${redirect}`,
    { mode: "no-cors" }
  );
  if (response.ok) {
    const jsonResponse = response.json();
    alert(jsonResponse);
    const params = new URLSearchParams(window.location.search);
  }
};
class Search extends React.Component {
  render() {
    return (
      <form //Will add an action here to go to the API
      >
        <input id="search" type="text" placeholder="Search for songs"></input>
        <button for="search" onClick={auth()}>
          Go
        </button>
      </form>
    );
  }
}

export default Search;
