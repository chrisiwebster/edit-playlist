import React, { useState } from "react";

//Components
import Button from "../Button";
import Input from "../Input";

//CSS
import "./Search.css";

const Search = ({
  setSearchTerm,
  search,
  accessToken,
  expiresIn,
  id,
  redirect,
}) => {
  return (
    <div>
      {!accessToken && (
        <a
          href={`https://accounts.spotify.com/authorize?client_id=${id}&response_type=token&redirect_uri=${redirect}`}
        >
          <Button name="Sign in" />
        </a>
      )}
      {expiresIn !== 0 && (
        <Input
          type="text"
          id="search"
          placeholder="Search for songs"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        >
          <Button type="submit" name="Search" onClick={() => search()} />
        </Input>
      )}
    </div>
  );
};

export default Search;
