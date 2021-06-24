import React from "react";

//Components
import Button from "../Button";
import Playlist from "../Playlist";

//CSS
import "./styles.css";

const Track = ({ track, savePlaylist, Playlist }) => {
  return (
    <div className="tracks">
      <div class="flex-wrapper">
        <h3>{track.name}</h3>
        <Button name="+" onClick={() => savePlaylist(track.name, track.uri)} />
      </div>
      <p>
        {track.artist} | {track.album}
      </p>
    </div>
  );
};

export default Track;
