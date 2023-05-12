import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const floApi = "https://ironrest.fly.dev/api/avatar-collection";
const apiUrl = "https://api.dicebear.com/6.x/pixel-art/svg?seed=";
//I can implement new fields that the user can input to describe more sides of themselves.

function DescriptionPage() {
  const [singleUser, setSingleUser] = useState([]);
  const params = useParams();

  function getUserInfo() {
    axios
      .get(floApi)
      .then((response) => {
        console.log(response.data);
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
            <h3>{userId.description}</h3>
          </div>
        )}
      </div>
      <Link to={"/"}>Back</Link>
    </>
  );
}

export default DescriptionPage;
