import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiUrl = "https://ironrest.fly.dev/api/avatar-collection";

const DisplayAvatar = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const { nickName, description } = item;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      nickName.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div id="avatar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredData.length > 0 ? (
        <ul id="avatar-list">
          {filteredData.map((item) => (
            <li key={item._id} className="avatar-item">
              <Link
                to={`/description-page/${item._id}`}
                className="avatar-link"
              >
                {item.image && (
                  <div className="avatar">
                    <img src={item.image} alt="avatar" />
                  </div>
                )}
                <div className="nickname">{item.nickName}</div>
                <div className="description">{item.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No matching data</h3>
      )}
    </div>
  );
};

export default DisplayAvatar;
