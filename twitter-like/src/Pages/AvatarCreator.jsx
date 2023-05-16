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
    navigateTo(-1);
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
      .then((response) => {})
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
            <button type="submit" className="sendB">
              Send
            </button>
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

//   if (event.target.value === "") {
//     setAccessories("");
//   } else {
//     setAccessories(
//       "&accessoriesProbability=100&accessories=" +
//         event.target.value
//     );
//   }
// }}

{
  /* <label>
          Accessories:
          <select
            name="accessoryList"
            defaultValue={accessories}
            onChange={(event) => {

              if (event.target.value === "") {
                setAccessories("");
              } else {
                setAccessories(
                  "&accessoriesProbability=100&accessories=" +
                    event.target.value
                );
              }
            }}
          >
            <option value="">None</option>
            <option value="glasses">Glasses</option>
            <option value="glasses2">Glasses2</option>
            <option value="glasses3">Glasses3</option>
            <option value="glasses4">Glasses4</option>
            <option value="glasses5">Glasses5</option>
          </select>
        </label>
        <label>
          Face:
          <select
            name="faceList"
            defaultValue={face}
            onChange={(event) => {
              if (event.target.value === "") {
                setFace("");
              } else {
                setFace("&face=" + event.target.value);
              }
            }}
          >
            <option value="">None</option>
            <option value="angryWithFang">Not Having it</option>
            <option value="blank">Blank</option>
            <option value="calm">Calm</option>
            <option value="cheeky">Flirty</option>
            <option value="concerned">Concerned</option>
            <option value="concernedFear">Concerned and Fearful</option>
            <option value="contempt">Contempt</option>
            <option value="cute">Cute</option>
            <option value="cyclops">Cyclops</option>
            <option value="driven">Motivated</option>
            <option value="eatingHappy">Happy to eat!</option>
            <option value="explaining">Let me Explain</option>
            <option value="eyesClosed">Eyes Closed</option>
            <option value="fear">Fear</option>
            <option value="hectic">Feeling Hectic</option>
            <option value="lovingGrin1">Loving</option>
            <option value="lovingGrin2">Loving but shy</option>
            <option value="monster">Monster</option>
            <option value="old">Old</option>
            <option value="rage">Rage</option>
            <option value="serious">Serious</option>
            <option value="smile">Smile</option>
            <option value="smileBig">Cheesing</option>
            <option value="smileLOL">Dying of Laughter</option>
            <option value="smileTeethGap">Gap Teeeth</option>
            <option value="solemn">Sad</option>
            <option value="suspicious">Looking Sus</option>
            <option value="tired">Tired</option>
            <option value="veryAngry">Not having it</option>
          </select>
        </label>

        <label>
          Hair:
          <select
            name="hairList"
            defaultValue={hair}
            onChange={(event) => {
              if (event.target.value === "") {
                setHair("");
              } else {
                setHair("&head=" + event.target.value);
              }
            }}
          >
            <option value="">None</option>
            <option value="afro">Afro</option>
            <option value="bangs">Bangs</option>
            <option value="bangs2">Bangs 2</option>
            <option value="bantuKnots">Bantu Knots</option>
            <option value="bear">Bear</option>
            <option value="bun">Bun</option>
            <option value="bun2">Bun 2</option>
            <option value="buns">Buns</option>
            <option value="cornrows">Cornrows</option>
            <option value="cornrows2">Cornrows 2</option>
            <option value="dreads1">Dreads</option>
            <option value="dreads2">Dreads 2</option>
            <option value="flatTop">Flat Top</option>
            <option value="flatTopLong">Flat Top 2</option>
            <option value="grayBun">Gray Bun</option>
            <option value="grayMedium">Gray Medium</option>
            <option value="grayShort">Gray Short</option>
            <option value="hatBeanie">Beanie</option>
            <option value="hatHip">Stylish Hat</option>
            <option value="hijab">Hijab</option>
            <option value="long">Long Hair</option>
            <option value="longAfro">Large Fro</option>
            <option value="longBangs">Long Bangs</option>
            <option value="longCurly">Curly</option>
            <option value="medium1">Medium 1</option>
            <option value="medium2">Medium 2</option>
            <option value="medium3">Medium 3</option>
            <option value="mediumBangs">Medium Bangs</option>
            <option value="mediumBangs2">Medium Bangs 2</option>
            <option value="mediumBangs3">Medium Bangs 3</option>
            <option value="mediumStraight">Medium Straight</option>
            <option value="mohawk">Mohawk</option>
            <option value="mohawk2">Mohawk 2</option>
            <option value="noHair1">Bald</option>
            <option value="noHair2">No hair</option>
            <option value="noHair3">No hair 2</option>
            <option value="pomp">Pomp</option>
            <option value="shaved1">Side shave</option>
            <option value="shaved2">Side shave 2</option>
            <option value="shaved3">Side shave 3</option>
            <option value="short1">Short Hair</option>
            <option value="short2">Short Hair 2</option>
            <option value="short3">Short Hair 3</option>
            <option value="short4">Short Hair 4</option>
            <option value="short5">Short Hair 5</option>
            <option value="turban">Turban</option>
            <option value="twists">Twists</option>
            <option value="twists2">Twists 2</option>
          </select>
        </label>

        <label>
          Cloth color
          <select
            name="clothList"
            defaultValue={clothColor}
            onChange={(event) => {
              if (event.target.value === "") {
                setClothColor("");
              } else {
                setClothColor("&clothingColor=" + event.target.value);
              }
            }}
          >
            <option value="">None</option>
            <option value="87a7df">Dark Blue</option>
            <option value="9ddadb">Light Blue</option>
            <option value="78e185">Green</option>
            <option value="e279c7">Pink</option>
            <option value="e78276">Orange</option>
            <option value="fdea6b">Yellow</option>
          </select>
        </label>

        <label>
          Skin Color
          <select
            name="skinList"
            defaultValue={skin}
            onChange={(event) => {
              if (event.target.value === "") {
                setSkin("");
              } else {
                setSkin("&skinColor=" + event.target.value);
              }
            }}
          >
            <option value="">None</option>
            <option value="694d3d">Skin type 1</option>
            <option value="ae5d29">Skin type 2</option>
            <option value="d08b5b">Skin type 3</option>
            <option value="edb98a">Skin type 4</option>
            <option value="ffdbb4">Skin type 5</option>
          </select>
        </label>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        /> */
}
