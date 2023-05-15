import React, { useEffect } from "react";
import "./AvatarCreator.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = "https://api.dicebear.com/6.x/open-peeps/svg?seed=";
const floApi = "https://ironrest.fly.dev/api/avatar-collection";

import axios from "axios";
//I need the API to store users information.
//How to determine which file endpoint will refer to when a user is inputting thier informaiton?

function AvatarCreator() {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  //i might try to input an image directly and use this as a placeholder
  const [description, setDescription] = useState("");
  const [accessories, setAccessories] = useState("");
  const [face, setFace] = useState("");
  const [hair, setHair] = useState("");

  /* I thought I needed a useEffect but I dont. My code is working without it.*/
  // useEffect(() => {
  //   console.log("USE EFFECT");
  //   console.log(accessories);

  //   axios
  //     .get(apiUrl + `${nickName}` + `${accessories}`)
  //     .then((response) => {
  //       setImage(response.data);
  //       // console.log(response.data);
  //       // image = response.data;
  //       // console.log(image);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [accessories]);

  function handleSubmit(event) {
    event.preventDefault();
    // navigateTo(-1);
    // let image;

    /* 
  - wrapping my axios get request here solves the issue "status 400" when a user switches between options. 
  - I still have the issue when a user chooses another option it doesn't show. 
  - I still get a "status 400" when i revert select none after choosing other options. 
  */

    /*What I have below triggers a "status 400".*/
    axios
      .get(apiUrl + `${nickName}` + `${face}` + `${hair}` + `${accessories}`)
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
      nickName: nickName,
      email: email,
      password: password,
      image: `https://api.dicebear.com/6.x/open-peeps/svg?seed=${nickName}${face}${hair}${accessories}`,
      message: message,
      description: description,
    };

    axios
      .post(floApi, userObject)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // console.log(accessories);
  // console.log(apiUrl + `${nickName}` + `${accessories}`);

  return (
    <div>
      <h1>Create Your Avatar</h1>
      <form id="container1" onSubmit={handleSubmit}>
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
        <label>Nickname:</label>
        <input
          type="text"
          value={nickName}
          onChange={(event) => {
            setNickName(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            ``;
          }}
        />
        <img
          className="avatar-img"
          src={
            "https://api.dicebear.com/6.x/open-peeps/svg?seed=" +
            `${nickName}` +
            `${face}` +
            `${hair}` +
            `${accessories}`
          }
          alt="avatar"
        />
        <label>
          Accessories:
          <select
            name="accessoryList"
            defaultValue={accessories}
            onChange={(event) => {
              /* I had to read the documentation and i noticed sometimes the accessories would pop up, so adjusting the probability to 100 ensures when a user selects an accessory it'll show on the avatar.*/

              /* The status 400 issue came about due to my if statement below. I had if(!accessories)  then it'll run something. Problem is that when a user chooses something the glasses state changes so when when I would try and choose another pair of glasses it would come up empty and immediately resort to the else statement which was "". */

              /*If you cant explain the code then it may cause you some issue later. Try and make sense of each code you write so I wouldn't get caught off guard when something isnt't working */

              if (event.target.value === "") {
                setAccessories("");
              } else {
                setAccessories(
                  "&accessoriesProbability=100&accessories=" +
                    event.target.value
                );

                //   if (!accessories) {
                //     setAccessories(event.target.value);
                //   } else {
                //     setAccessories("");
                //   }
              }
              /*I dont understand why when a user chooses between each option listed some will show and others wouldnt?  */
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
            <option value="hatHip">Stylish Cap</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </label>

        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <label>Description:</label>
        <textarea
          type="textbox"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {/* <button type="submit" to="">Go Back</button> */}
      <Link to={"/"}>Back</Link>
    </div>
  );
}

export default AvatarCreator;

/*keep this one for later*/
// axios.get(apiUrl + `${name}`, userObject).then((response) => {
//     console.log(response)
// })

//   function accessoryHandler(event) {
//     if (accessories === "") {
//       setAccessories("");
//     } else {
//       setAccessories("&accessories=" + event.target.value);
//     }
//   }

//   console.log(setAccessories);
