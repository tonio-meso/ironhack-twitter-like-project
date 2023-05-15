import React from "react";
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
  const [nickName, setNickName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  //i might try to input an image directly and use this as a placeholder
  const [description, setDescription] = useState("");
  const [accessories, setAccessories] = useState("");
  //   const [accessories, setAccessories] = useState([
  //     "glasses",
  //     "glasses2",
  //     "glasses3",
  //     "glasses4",
  //     "glasses5",
  //   ]);

  //   console.log(apiUrl + `${nickName}`);
  //   console.log(apiUrl + `${nickName}` + `${setAccessories}`);

  function handleSubmit(event) {
    event.preventDefault();
    // navigateTo(-1);
    // let image;

    axios
      .get(apiUrl + `${nickName}` + `${accessories}`)
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
      image: `https://api.dicebear.com/6.x/open-peeps/svg?seed=${nickName}${accessories}`,
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

  console.log(accessories);
  console.log(apiUrl + `${nickName}` + `${accessories}`);

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
        <img
          className="avatar-img"
          src={
            "https://api.dicebear.com/6.x/open-peeps/svg?seed=" +
            `${nickName}` +
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
              if (!accessories) {
                /* I had to read the documentation and i noticed sometimes the accessories would pop up, so adjusting the probability to 100 ensures when a user selects an accessory it'll show on the avatar.*/
                setAccessories(
                  "&accessoriesProbability=100&accessories=" +
                    event.target.value
                );
              } else {
                setAccessories("");
              }
              /*I dont understand why when a user chooses between each option listed some will show and others wouldnt?  */
            }}

            //     onChange={(event) => {
            //       if (
            //         accessories.filter((e) => e.target.value) === event.target.value
            //       ) {
            //         setAccessories(
            //           "&accessoriesProbability=100&accessories=" +
            //             event.target.value
            //         );
            //         console.log("hello WOrld");
            //       } else {
            //         setAccessories("");
            //       }
            //     }}
          >
            <option value={accessories}>None</option>
            <option value="glasses">Glasses</option>
            <option value="glasses2">Glasses2</option>
            <option value="glasses3">Glasses3</option>
            <option value="glasses4">Glasses4</option>
            <option value="glasses5">Glasses5</option>
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
