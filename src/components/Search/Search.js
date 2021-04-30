import React from "react";
import "./Search.css";

const id = process.env.SPOTIFY_KEY;
const redirect = "http://localhost:3000/";
const auth = (searchParams) => {
  const response = fetch(
    `https://accounts.spotify.com/authorize?client_id=${id}&response_type=code&redirect_uri=${redirect}`,
    { mode: "no-cors" }
  );
};

const Search = () => {
  return (
    <div>
      <input id="search" type="text" placeholder="Search for songs"></input>
      <button onClick={auth}>Test</button>
    </div>
  );
};

export default Search;
