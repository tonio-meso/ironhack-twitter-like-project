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
  const [accessories, setAccessories] = useState("");
  const [face, setFace] = useState("");
  const [skin, setSkin] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [hair, setHair] = useState("");
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
  // console.log(userId.image + `&face=angryWithFang`);
  function handleSubmit(event) {
    event.preventDefault();

    /* After a long while i was able to figure out how to connect to Flo's server to implement a patch when the user wants to send a message. Now i just need to figure out how to show this message in the main page. */

    /*--------------------------axiox get openpeeps-------------------------*/
    //this will be up to nickName portion filled.
    axios
      .get(
        userId.image +
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

    /*--------------------------axiox get openpeeps-------------------------*/

    axios
      .patch(floApi + "/" + userId._id, {
        image:
          userId.image +
          `${face}` +
          `${hair}` +
          `${accessories}` +
          `${clothColor}` +
          `${skin}`,
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
            <img
              src={
                userId.image +
                `${face}` +
                `${hair}` +
                `${accessories}` +
                `${clothColor}` +
                `${skin}`
              }
            />
            <h3>{userId.name}</h3>
            <h3>{userId.lastName}</h3>
            <h3>{userId.nickName}</h3>
            <h3>{userId.description}</h3>
            <h3>{userId.message}</h3>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* ----------------------------------------------------------- */}
          <label>
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

          {/* ------------------------------------------------------------ */}
          {/* <label>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          /> */}
          <button type="submit">Send</button>
        </form>
      </div>
      <Link to={"/"}>Back</Link>
    </>
  );
}

export default DescriptionPage;
