import React, { useState } from "react";
import Image from "../assets/image2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namefirst: "",
    namelast: "",
    username: "",
    password: "",
    phonenumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.namefirst.trim()) {
      errors.namefirst = "First name is required";
      isValid = false;
    }
    if (!formData.namelast.trim()) {
      errors.namelast = "Last name is required";
      isValid = false;
    }
    if (!formData.username.trim() || formData.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
      isValid = false;
    }

    if (!formData.phonenumber.match(/^\d{10}$/)) {
      errors.phonenumber = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    if (!formData.address.trim() || formData.address.length < 5) {
      errors.address = "Address must be at least 5 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7373/skilllink/registration",
        formData
      );

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
        navigate("/register");
      }
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
          <div className="login-center">
            <h2>Register to Skill🔗Link</h2>
            <p>Please enter your details</p>

            <form onSubmit={handleSubmit}>
              {[
                { name: "namefirst", placeholder: "First Name" },
                { name: "namelast", placeholder: "Last Name" },
                { name: "username", placeholder: "Username" },
                { name: "phonenumber", placeholder: "Phone Number" },
                { name: "address", placeholder: "Address" },
              ].map(({ name, placeholder }) => (
                <div className="input-group" key={name}>
                  <input
                    type="text"
                    placeholder={placeholder}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && <p className="error">{errors[name]}</p>}
                </div>
              ))}

              <div className="input-group">
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
              </div>

              <div className="login-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
