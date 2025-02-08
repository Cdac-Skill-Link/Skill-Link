import React, { useEffect, useState } from "react";
import Image from "../assets/image4.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import "./serviceProviderRegistration.css";

import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios
        .post("http://localhost:7373/serviceprovider/login", formData)
        .then((response) => {
          const result = response.data;
          const { serviceProviderID, namefirst, namelast, username, skills, wages, phonenumber, rating } = result;

          if (response.status === 200) {
            sessionStorage["s"] = serviceProviderID;
            sessionStorage["skills"] = skills;
            sessionStorage["phonenumber"] = phonenumber;
            sessionStorage["namefirst"] = namefirst;
            sessionStorage["namelast"] = namelast;
            sessionStorage["username"] = username;
            sessionStorage["wages"] = wages;
            sessionStorage["rating"] = rating;
            sessionStorage["status"] = "ServiceLoginsuccess";

            alert("Login successful!");
            navigate("/data");
          } else {
            alert("Wrong Credentials");
            navigate("/serviceprovider");
          }
        });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="SkillLink" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome to Skill🔗Finder</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
              <div className="login-center-options">
                <a href="/serviceforgotpass" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account?{" "}
            <a href="/ServiceProviderregister">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceLogin;
