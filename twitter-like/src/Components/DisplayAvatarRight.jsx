import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const apiUrl = "https://ironrest.fly.dev/api/avatar-collection";
const apiUrlDelete = "https://ironrest.fly.dev/api/avatar-collection";

function DisplayAvatarRight() {
  // i start to create a useState Hook to store the data
  const [data, setData] = useState("");

  const getAllData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);

  function handleDelete(_id) {
    axios
      .delete(`${apiUrlDelete}/${_id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div id="avatar-container">
        {data ? (
          <ul id="avatar-list">
            {data.map((item) => {
              return (
                <li key={item._id} className="avatar-item">
                  {/* <Link
                    to={`/description-page/${item._id}`}
                    className="avatar-link"
                  > */}
                  {item.message && (
                    <div className="avatar">
                      <img src={item.image} alt="avatar" />
                    </div>
                  )}
                  {item.message && (
                    <div>
                      <span className="username">{item.nickName}</span>

                      <div className="description">{item.message}</div>
                    </div>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>

                  {/* <div className="description">{item.description}</div> */}
                  {/* </Link> */}
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>No data yet</h3>
        )}
      </div>
    </>
  );
}

export default DisplayAvatarRight;
