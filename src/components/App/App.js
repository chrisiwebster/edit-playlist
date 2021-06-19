import React, { useState } from "react";

//Components
import SearchResults from "../SearchResults";
import Header from "../Header";
import Search from "../Search";

import "./App.css";

//Variables
const id = process.env.REACT_APP_SPOTIFY_KEY;
const redirect = "http://localhost:3000/";
let accessToken;
let expiresIn = 0;

//Access token check
const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
//if they're there grabs the right stuff
if (accessTokenMatch && expiresInMatch) {
  accessToken = accessTokenMatch[1];
  expiresIn = Number(expiresInMatch[1]);
  //every second, removes a value from token, if expiresIn is 0, there is no accessToken.
  setInterval(() => {
    expiresIn--;
    if (expiresIn === 0) {
      accessToken = "";
    }
  }, 1000);
}

//App component
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const search = () => {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          //if there are no tracks in the response
          return [];
        }
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      })
      .then((jsonResponse) => {
        setSearchTracks(jsonResponse);
      });
  };

  return (
    <div>
      <Header title="Playlist Maker" />
      <Search
        search={search}
        setSearchTerm={setSearchTerm}
        accessToken={accessToken}
        expiresIn={expiresIn}
        id={id}
        redirect={redirect}
        searchTracks={searchTracks}
      />
      <SearchResults searchTracks={searchTracks} />
    </div>
  );
};

export default App;
