import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const floApi = "https://ironrest.fly.dev/api/avatar-collection";
const apiUrl = "https://api.dicebear.com/6.x/pixel-art/svg?seed=";
//I can implement new fields that the user can input to describe more sides of themselves.

function DescriptionPage() {
  const [singleUser, setSingleUser] = useState([]);
  const [message, setMessage] = useState("");
  const params = useParams();
  const navigateTo = useNavigate();

  function getUserInfo() {
    axios
      .get(floApi)
      .then((response) => {
        // console.log(response.data);
        setSingleUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const userId = singleUser.filter((user) => {
    return user._id === params._id;
  })[0];

  /*For a while i assumed that userId was giving me the ID but this was not true. It gave me the object of the specific user. So to pass this back into the api i needed the to grab the id then send a request to patch.
  - so simply check the values of each variable. 
  */
  //   console.log(userId);
  //   console.log(userId._id);
  //   console.log(`${floApi}/${userId._id}`);

  function handleSubmit(event) {
    event.preventDefault();

    /* After a long while i was able to figure out how to connect to Flo's server to implement a patch when the user wants to send a message. Now i just need to figure out how to show this message in the main page. */

    axios
      .patch(floApi + "/" + userId._id, {
        message: message,
      })
      .then((response) => {
        console.log(response);
        navigateTo("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div>
        <h1>Your Profile</h1>
      </div>
      <div>
        {userId && (
          <div>
            <img src={userId.image} />
            <h3>{userId.name}</h3>
            <h3>{userId.lastName}</h3>
            <h3>{userId.nickName}</h3>
            <h3>{userId.description}</h3>
            <h3>{userId.message}</h3>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <Link to={"/"}>Back</Link>
    </>
  );
}

export default DescriptionPage;
