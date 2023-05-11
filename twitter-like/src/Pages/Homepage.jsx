import React from "react";
import { Link } from "react-router-dom";

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
          <ul id="profile-list">
            <li>
              <div className="avatar"></div>
              <span className="username">User1</span>
            </li>
            <li>
              <div className="avatar"></div>
              <span className="username">User2</span>
            </li>
            <li>
              <div className="avatar"></div>
              <span className="username">User3</span>
            </li>
            <li>
              <div className="avatar"></div>
              <span className="username">User4</span>
            </li>
          </ul>
          <form method="post">
            <Link to={"/avatar-creator"}>
              <button type="submit">New Avatar</button>
            </Link>
          </form>
        </div>
        <div id="right-container">
          <form>
            <textarea placeholder="What's happening?" rows="3"></textarea>
            <button type="submit">Tweet</button>
          </form>
        </div>
      </div>
      <footer>@Toheeb Antoine 2023</footer>
    </>
  );
}

export default Homepage;
