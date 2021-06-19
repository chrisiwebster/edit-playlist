import React from "react";

const Track = ({ track }) => {
  return (
    <p>
      {track.artist} | {track.album}
    </p>
  );
};

export default Track;
