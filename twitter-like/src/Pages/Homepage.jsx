import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvatarCreator from "./AvatarCreator";

function Homepage() {
  // instead of open a new page to create or new avatar lets try to use a dialog box for that
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeDialog() {
    setIsDialogOpen(false);
  }

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
          <button onClick={() => setIsDialogOpen(true)}>New Avatar</button>
        </div>
        <div id="right-container">
          <form>
            <textarea placeholder="What's happening?" rows="3"></textarea>
            <button type="submit">Tweet</button>
          </form>
        </div>
      </div>
      <footer>@Toheeb Antoine 2023</footer>
      {/* Antoine : now with this part we know if the dialog is open or not */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <AvatarCreator onClose={closeDialog} />
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
