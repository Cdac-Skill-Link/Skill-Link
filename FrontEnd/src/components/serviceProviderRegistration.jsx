import React, { useEffect, useState } from "react";
import Image from "../assets/image3.jpg";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const skillsList = ["Electrician", "Cleaner", "Gardener", "Painter", "Carpenter", "Pest Controller"];

const ServiceRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namefirst: "",
    namelast: "",
    username: "",
    password: "",
    phonenumber: "",
    skills: "",
    wages: "",
    address: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.namefirst.trim()) newErrors.namefirst = "First name is required";
    if (!formData.namelast.trim()) newErrors.namelast = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
    }
    if (!/^[0-9]{10}$/.test(formData.phonenumber)) newErrors.phonenumber = "Invalid phone number";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.wages.trim() || isNaN(formData.wages) || formData.wages <= 0) newErrors.wages = "Invalid wage amount";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post("http://localhost:7373/serviceprovider/register", formData);
      if (response.status === 200) {
        alert("Success");
        navigate("/serviceprovider");
      } else {
        alert("Wrong Credentials");
        navigate("/ServiceProviderregister");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-main" style={{ display: "flex" }}>
      <div className="login-left" style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px", boxSizing: "border-box" }}>
        <h2>Earn More with</h2>
        <h2> Skill🔗Link</h2>
        <img src={Image} alt="" style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }} />
      </div>
      <div className="login-right" style={{ width: "50%" }}>
        <div className="login-right-container" style={{ marginTop: "50px", overflowY: "auto" }}>
          <h2>Please enter your details</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" name="namefirst" value={formData.namefirst} onChange={handleChange} />
            {errors.namefirst && <span className="error">{errors.namefirst}</span>}

            <input type="text" placeholder="Last Name" name="namelast" value={formData.namelast} onChange={handleChange} />
            {errors.namelast && <span className="error">{errors.namelast}</span>}

            <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}

            <div className="pass-input-div">
              <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
              {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
            </div>
            {errors.password && <span className="error">{errors.password}</span>}

            <input type="text" placeholder="Phone Number" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
            {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}

            <select name="skills" value={formData.skills} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="">Select a skill</option>
              {skillsList.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
            {errors.skills && <span className="error">{errors.skills}</span>}

            <input type="text" placeholder="Wages" name="wages" value={formData.wages} onChange={handleChange} />
            {errors.wages && <span className="error">{errors.wages}</span>}

            <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceRegistration;
