import React from "react";

//Components
import Button from "../Button";
//CSS
import "./styles.css";

const Track = ({ track }) => {
  return (
    <div className="tracks">
      <div class="flex-wrapper">
        <h3>{track.name}</h3>
        <Button name="+" />
      </div>
      <p>
        {track.artist} | {track.album}
      </p>
    </div>
  );
};

export default Track;
