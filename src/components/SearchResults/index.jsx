import React from "react";

//Components
import Track from "../Track";

const SearchResults = ({ searchTracks }) => {
  return (
    <div className="TrackList">
      {searchTracks.map((track) => {
        return <Track track={track} key={track.id} />;
      })}
    </div>
  );
};

export default SearchResults;
