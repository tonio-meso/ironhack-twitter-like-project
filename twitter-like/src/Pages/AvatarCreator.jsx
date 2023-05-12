import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = "https://api.dicebear.com/6.x/pixel-art/svg?seed=";
// const apiUrl = "https://api.dicebear.com/6.x/pixel-art/jpg?seed=";
// const apiUrl = "https://api.dicebear.com/6.x/pixel-art/png?seed=";
const floApi = "https://ironrest.fly.dev/api/avatar-collection";

import axios from "axios";
//I need the API to store users information.
//How to determine which file endpoint will refer to when a user is inputting thier informaiton?

function AvatarCreator() {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  //i might try to input an image directly and use this as a placeholder
  const [description, setDescription] = useState("");

  console.log(apiUrl + `${name}`);

  function handleSubmit(event) {
    event.preventDefault();
    navigateTo(-1);
    // let image;

    axios
      .get(apiUrl + `${name}`)
      .then((response) => {
        setImage(response.data);
        // console.log(response.data);
        // image = response.data;
        // console.log(image);
      })
      .catch((error) => {
        console.log(error);
      });

    const userObject = {
      name: name,
      lastName: lastName,
      image: `https://api.dicebear.com/6.x/open-peeps/svg?seed=${name}`,
      description: description,
    };

    axios
      .post(floApi, userObject)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    /*keep this one for later*/
    // axios.get(apiUrl + `${name}`, userObject).then((response) => {
    //     console.log(response)
    // })
  }

  return (
    <div>
      <h1>Create Your Avatar</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {/* since im currently not able to figure out why i cant post the stored image to flo's api i had to figure out another way to get a random image. I think what I wrote below is a good start. Still thinking on how to make one of the randomized image belong to a specific user.  */}
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <img
          src={"https://api.dicebear.com/6.x/open-peeps/svg?seed=" + `${name}`}
          alt="avatar"
        />

        <label>Description:</label>
        <textarea
          type="textbox"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default AvatarCreator;
