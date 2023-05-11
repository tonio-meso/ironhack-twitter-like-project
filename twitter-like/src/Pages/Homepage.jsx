import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <div id="sidebar">
        <h1>Like twitter but better</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <Link to={"/avatar-creator"}>
              <button type="submit">New Avatar</button>
            </Link>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Profile 1</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Profil 2</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}

export default Homepage;
