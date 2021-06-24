import React from "react";

//Components
import Track from "../Track";

//CSS
import "./styles.css";

const SearchResults = ({ searchTracks, expiresIn, savePlaylist, playlist }) => {
  return (
    <div className="tracks-wrapper">
      {expiresIn !== 0 && <h2>Search results ({searchTracks.length})</h2>}
      {searchTracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            playlist={playlist}
            savePlaylist={savePlaylist}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
