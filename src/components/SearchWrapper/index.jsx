import React, { useState } from "react";

//Components
import SearchResults from "../SearchResults";
import Search from "../Search";

//Variables
const id = process.env.REACT_APP_SPOTIFY_KEY;
const redirect = window.location.href;
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
      document.location.reload();
    }
  }, 1000);
}

//SearchWrapper
const SearchWrapper = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchInput, setSearchInput] = useState();

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setSearchTerm(searchInput);
  };

  const handleClearSearchInput = () => {
    setSearchInput("");
  };

  const handleAPISearch = (e) => {
    e.preventDefault();
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
      <Search
        handleAPISearch={handleAPISearch}
        accessToken={accessToken}
        expiresIn={expiresIn}
        redirect={redirect}
        id={id}
        handleSearchInput={handleSearchInput}
        handleClearSearchInput={handleClearSearchInput}
        searchInput={searchInput}
      />
      <SearchResults searchTracks={searchTracks} expiresIn={expiresIn} />
    </div>
  );
};

export default SearchWrapper;
