import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrlForLogIn = "https://ironrest.fly.dev/api/avatar-collection";

  function handleSubmit(event) {
    event.preventDefault();

    // Create an object with the login data
    const loginData = {
      email: email,
      password: password,
    };

    // Send a GET request to retrieve the user data
    axios
      .get(apiUrlForLogIn)
      .then((response) => {
        // Handle the response from the API
        const userData = response.data.find(
          (user) =>
            user.email === loginData.email &&
            user.password === loginData.password
        );

        // Check if the provided credentials match with the retrieved user data
        if (userData) {
          // Login successful
          console.log("Login successful!");

          // Store the user _id in local storage
          localStorage.setItem("userId", userData._id);

          // Invoke the onClose function to close the dialog box
          onClose();
        } else {
          // Login failed
          setErrorMessage("Invalid email or password.");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.log(error);
        setErrorMessage("An error occurred during login.");
      });
  }

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
