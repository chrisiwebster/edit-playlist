import React, { useState } from "react";

//CSS
import "./styles.css";

//Components
import SearchResults from "../SearchResults";
import Search from "../Search";
import Playlist from "../Playlist";

//Variables
const id = process.env.REACT_APP_SPOTIFY_KEY;
const redirect = `${window.location.href}#/search`;
let accessToken;
let expiresIn = 0;

//Access token check
const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
//if they're there grabs the right stuff
if (accessTokenMatch && expiresInMatch) {
  accessToken = accessTokenMatch[1];
  expiresIn = Number(expiresInMatch[1]);
  //redirects to the search page (wasn't loading)
  // window.location.href =
  //   "https://chrisiwebster.github.com/edit-playlist/#/search";
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
  const [playlist, setPlaylist] = useState([]);

  const handleSignIn = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${id}&response_type=token&redirect_uri=${redirect}`;
  };

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

  const savePlaylist = (name, trackUris) => {
    if (!name || !trackUris.length) {
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    return fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          })
          .then((jsonResponse) => {
            setPlaylist(jsonResponse);
          });
      });
  };

  return (
    <div className="search-wrapper">
      <Search
        handleAPISearch={handleAPISearch}
        accessToken={accessToken}
        expiresIn={expiresIn}
        handleSearchInput={handleSearchInput}
        handleClearSearchInput={handleClearSearchInput}
        searchInput={searchInput}
        handleSignIn={handleSignIn}
      />
      <SearchResults
        searchTracks={searchTracks}
        expiresIn={expiresIn}
        savePlaylist={savePlaylist}
        playlist={playlist}
      />
      <Playlist />
    </div>
  );
};

export default SearchWrapper;
