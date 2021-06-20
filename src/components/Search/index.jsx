import React from "react";

//Components
import Button from "../Button";
import Input from "../Input";

//CSS
import "./styles.css";

const Search = ({
  handleAPISearch,
  accessToken,
  expiresIn,
  id,
  searchInput,
  handleSearchInput,
  redirect,
  handleClearSearchInput,
}) => {
  return (
    <div className="search-buttons">
      {!accessToken && (
        <a
          href={`https://accounts.spotify.com/authorize?client_id=${id}&response_type=token&redirect_uri=${redirect}`}
        >
          <Button type="button" name="Sign in" id="sign" />
        </a>
      )}
      {expiresIn !== 0 && (
        <form onSubmit={(e) => handleAPISearch(e)}>
          <Input
            type="text"
            value={searchInput}
            id="search"
            placeholder="Search for songs"
            onChange={(e) => handleSearchInput(e)}
            onBlur={() => handleClearSearchInput()}
          />
          <Button type="submit" name="Search" />
        </form>
      )}
    </div>
  );
};

export default Search;
