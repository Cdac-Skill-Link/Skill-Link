import React, { useEffect, useState } from "react";
import Image from "../assets/image4.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceLogin = () => {
  const [ showPassword, setShowPassword ] = useState(false);
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
});
const [message, setMessage] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:7373/serviceprovider/login', formData).then((response) => {
            const result = response.data
          //   const status = response.status
              console.log(response.data);
            //   const { userId, userName, emailId, password, role } = result
            //   console.log(userId)
            console.log(response.data);
               const { serviceProviderID,namefirst, namelast, username, skills, wages ,phonenumber,rating} = result
               console.log(serviceProviderID)
            if (response.status===200){
                // toast.warning("success")
                sessionStorage["s"]=serviceProviderID
                sessionStorage["skills"]=skills
                sessionStorage["phonenumber"]=phonenumber
                sessionStorage["namefirst"]=namefirst
                sessionStorage["namelast"]=namelast
                sessionStorage["username"]=username
                sessionStorage["wages"]=wages
                sessionStorage["rating"]=rating
                sessionStorage["status"]="ServiceLoginsuccess"

                alert("success")
                navigate("/data")
            }else{
                alert("Wrong Credential")
                // toast.warning("wrong")
                navigate("/serviceprovider")
            }
        
           }   )
        
        
        // setMessage(response.data); // Set the message received from the server
    } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again later.'); // Set a generic error message
    }
};
  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
        {/* <p style="background-image: url(../assets/image.png')">To login as a serviceprovider</p>
        <a href="/">click here</a> */}
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome to Skill🔗Link</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange}/>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
             
                <a href="seviceforgotpass" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                

               
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="/ServiceProviderregister">Sign Up</a>
          </p>
         
        </div>
      
      </div>
    </div>
  );
};

export default ServiceLogin;
