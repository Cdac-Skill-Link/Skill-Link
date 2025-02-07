import axios from "axios";
import "../LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const userId = sessionStorage["userId"];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skills: "",
    wages: "",
    address: "",
    date: "",
    userId: userId,
    namefirst: sessionStorage["namefirst"],
    namelast: sessionStorage["namelast"],
    phonenumber: sessionStorage["phonenumber"],
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

    if (!formData.skills.trim()) {
      errors.skills = "Service skill is required";
      isValid = false;
    }
    if (!formData.wages || isNaN(formData.wages) || formData.wages <= 0) {
      errors.wages = "Wages must be a positive number";
      isValid = false;
    }
    if (!formData.address.trim() || formData.address.length < 5) {
      errors.address = "Address must be at least 5 characters long";
      isValid = false;
    }
    if (!formData.date) {
      errors.date = "Date is required";
      isValid = false;
    } else {
      const today = new Date().toISOString().split("T")[0];
      if (formData.date < today) {
        errors.date = "Date cannot be in the past";
        isValid = false;
      }
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
      await axios
        .post("http://localhost:7373/skilllink/insertUserRequirement", formData)
        .then(() => {
          navigate("/servicelist");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <center className="login-center">
      <h1>Skill🔗Link</h1>
      <h3>
        <b>Hello {sessionStorage["namefirst"]}</b>
      </h3>
      <div className="container">
        <h3>Enter Your Requirement</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pid">Your ID</label>
            <input
              type="text"
              className="form-control"
              id="pid"
              name="userId"
              value={sessionStorage["userId"]}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Service</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="wages">Wages</label>
            <input
              type="number"
              className="form-control"
              id="wages"
              name="wages"
              value={formData.wages}
              onChange={handleChange}
            />
            {errors.wages && <p className="error">{errors.wages}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>

          <button type="submit" className="btn btn-primary">
            Add Service
          </button>
        </form>
      </div>
    </center>
  );
};

export default ServiceForm;
