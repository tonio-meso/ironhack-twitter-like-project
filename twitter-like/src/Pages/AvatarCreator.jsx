import React from "react";
import { useState } from "react";
import { Link } from "react";
const apiUrl = "https://api.dicebear.com/6.x/pixel-art/svg?seed=";
import axios from "axios";
//I need the API to store users information.
//How to determine which file endpoint will refer to when a user is inputting thier informaiton?

function AvatarCreator() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");

  console.log(apiUrl + `${name}`);

  function handleSubmit(event) {
    event.preventDefault();

    const userObject = {
      name: name,
      lastName: lastName,
      image: image,
      description: description,
    };

    let image;

    axios
      .get(apiUrl + `${name}`)
      .then((response) => {
        // console.log(response.data);
        image = response.data;
        console.log(image);
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
        {/* <img src="../../public/testPicture.svg" /> */}
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default AvatarCreator;
