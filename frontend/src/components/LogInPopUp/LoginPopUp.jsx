import React, { useState, useContext } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopUp = ({ setShowLoginPopUp }) => {
  const [currState, setCurrState] = useState("log in");
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { url, token, setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currState === "log in") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      console.log("Calling API: ", newUrl);
      console.log("Data being sent:", data);

      const response = await axios.post(newUrl, data);
      console.log("Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLoginPopUp(false); // Close the popup on success
        alert(
          `${currState === "log in" ? "Login" : "Registration"} successful!`
        );
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="log-in-pop-up">
      <form onSubmit={onLogin} className="log-in-pop-container">
        <div className="login-pop-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLoginPopUp(false)}
            src={assets.cross_icon}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "log in" ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              placeholder="Enter your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-pop-button" type="submit">
          {currState === "sign Up" ? "Create Account" : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms and conditions</p>
        </div>
        <div className="login-pop">
          {currState === "log in" ? (
            <p>
              Create a new account ?{" "}
              <span onClick={() => setCurrState("sign Up")}>click here</span>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <span onClick={() => setCurrState("log in")}> login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
