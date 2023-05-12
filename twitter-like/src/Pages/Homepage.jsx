import React from "react";
import { Link } from "react-router-dom";
import DisplayAvatar from "../Components/DisplayAvatar";

function Homepage() {
  return (
    <>
      <header>Like Twitter but Better</header>
      <div id="main">
        <div id="left-container">
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
          </form>
          <div>{<DisplayAvatar />}</div>
          <form method="post">
            <Link to={"/avatar-creator"}>
              <button type="submit">New Avatar</button>
            </Link>
          </form>
        </div>
        <div id="right-container">
          <div id="wrapping-message-box"></div>
          <div id="wrapping-input-box">
            <form>
              <textarea placeholder="What's happening?" rows="3"></textarea>
              <button type="submit">Tweet</button>
            </form>
          </div>
        </div>
      </div>
      <footer>@Toheeb Antoine 2023</footer>
    </>
  );
}

export default Homepage;
