import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiUrlAvatar = "https://ironrest.fly.dev/api/avatar-collection";
const apiUrlTweet = "https://ironrest.fly.dev/api/tweet-collection";

function Tweeting() {
  const [data, setData] = useState([]);
  const [promptText, setPromptText] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .all([axios.get(apiUrlAvatar), axios.get(apiUrlTweet)])
      .then(
        axios.spread((avatarResponse, tweetResponse) => {
          const avatars = avatarResponse.data;
          const tweets = tweetResponse.data;

          const mergedData = tweets.map((tweet) => {
            const avatar = avatars.find(
              (avatar) => avatar._id === tweet.userId
            );
            return {
              _id: tweet._id,
              userId: tweet.userId,
              message: tweet.message,
              timestamp: tweet.timestamp,
              image: avatar ? avatar.image : "",
              nickName: avatar ? avatar.nickName : "",
            };
          });

          setData(mergedData);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePromptSubmit = () => {
    const userId = localStorage.getItem("userId");

    // check if userId
    if (userId) {
      const date = new Date();
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = date.toLocaleString(undefined, options);

      const tweetData = {
        userId: userId,
        message: promptText,
        timestamp: formattedDate,
      };
      axios
        .post(apiUrlTweet, tweetData)
        .then((response) => {
          getAllData();
        })
        .catch((error) => {
          console.log(error);
        });

      setPromptText("");
    }
  };

  return (
    <div id="super-wrapper">
      <div id="wrapping-message-box">
        {data.length > 0 ? (
          <ul id="tweet-list">
            {data.map((item) => (
              <li key={item._id} className="avatar-item">
                {item.image && (
                  <div className="avatar">
                    <img src={item.image} alt="avatar" />
                  </div>
                )}
                {item.nickName && (
                  <div>
                    <span className="username">{item.nickName}</span>
                    <div className="description">{item.message}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <h3>No data yet</h3>
        )}
      </div>
      {localStorage.getItem("userId") && (
        <div className="prompt">
          <textarea
            placeholder="What's on your mind?"
            rows="3"
            value={promptText}
            onChange={(event) => setPromptText(event.target.value)}
          ></textarea>
          <button onClick={handlePromptSubmit}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Tweeting;