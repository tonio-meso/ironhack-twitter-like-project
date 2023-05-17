import React, { useEffect } from "react";
import "./AvatarCreator.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = "https://api.dicebear.com/6.x/open-peeps/svg?seed=";
const floApi = "https://ironrest.fly.dev/api/avatar-collection";

import axios from "axios";

function AvatarCreator() {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const [description, setDescription] = useState("");
  const [accessories, setAccessories] = useState("");
  const [face, setFace] = useState("");
  const [skin, setSkin] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [hair, setHair] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // let image;

    axios
      .get(
        apiUrl +
          `${nickName}` +
          `${face}` +
          `${hair}` +
          `${accessories}` +
          `${clothColor}` +
          `${skin}`
      )
      .then((response) => {
        setImage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const userObject = {
      name: name,
      lastName: lastName,
      nickName: nickName,
      email: email,
      password: password,
      image: `https://api.dicebear.com/6.x/open-peeps/svg?seed=${nickName}${face}${hair}${accessories}${clothColor}${skin}`,
      message: message,
      description: description,
    };

    axios
      .post(floApi, userObject)
      .then((response) => {
        navigateTo("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="header-avatar">
        <h2>Create Your Avatar</h2>
      </div>
      <div className="creator-body">
        <form id="container1" onSubmit={handleSubmit}>
          <div className="box-1">
            <h2>Please Fill out the form below: </h2>
            <span className="innerFlex">
              {/* <label>Name:</label> */}
              <input
                placeholder="Name"
                className="field name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />{" "}
              {/* <label>Last Name:</label> */}
              <input
                placeholder="Last Name"
                className="field lastName"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </span>
            <span className="innerFlex">
              {/* <label>Email</label> */}
              <input
                placeholder="Email"
                className="field email"
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              {/* <label>Password</label> */}
              <input
                placeholder="Password"
                className="field password"
                type="text"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  ``;
                }}
              />
            </span>
            <label>Username</label>
            <input
              placeholder="Username"
              className="field nickName"
              type="text"
              value={nickName}
              onChange={(event) => {
                setNickName(event.target.value);
              }}
            />
            <img
              className="avatar-img1"
              src={
                "https://api.dicebear.com/6.x/open-peeps/svg?seed=" +
                `${nickName}` +
                `${face}` +
                `${hair}` +
                `${accessories}` +
                `${clothColor}` +
                `${skin}`
              }
              alt="avatar"
            />

            <label>
              <h3>Brief Description:</h3>
            </label>
            <textarea
              className="field description"
              type="textbox"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">Send</button>
          </div>
        </form>
        <Link to={"/"}>Back</Link>
      </div>
    </div>
  );
}

export default AvatarCreator;

/* The status 400 issue came about due to my if statement below. I had if(!accessories)  then it'll run something. Problem is that when a user chooses something the glasses state changes so when when I would try and choose another pair of glasses it would come up empty and immediately resort to the else statement which was "". */

/*If you cant explain the code then it may cause you some issue later. Try and make sense of each code you write so I wouldn't get caught off guard when something isnt't working */
