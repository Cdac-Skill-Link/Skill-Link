import axios from "axios";
import "../LoginForm.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

const ServiceForm = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        skills: '',
        wages: '',
        address: '',
        date: '',
        userId: '',
        namefirst: '',
        namelast: '',
        phonenumber: ''
    });

    const [errors, setErrors] = useState({});

    // Preload session storage data
    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            userId: sessionStorage["userId"] || '',
            namefirst: sessionStorage["namefirst"] || '',
            namelast: sessionStorage["namelast"] || '',
            phonenumber: sessionStorage["phonenumber"] || ''
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        
        if (!formData.skills) newErrors.skills = "Please select a service";
        if (!formData.wages || formData.wages <= 0) newErrors.wages = "Wages must be a positive number";
        if (!formData.address.trim()) newErrors.address = "Address field is required";
        if (!formData.date) {
            newErrors.date = "Date is required";
        } else {
            const today = new Date().toISOString().split("T")[0];
            if (formData.date < today) newErrors.date = "Date cannot be in the past";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:7373/skilllink/insertUserRequirement', formData);
            navigate("/servicelist");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <center className="login-center">
            <h1>Skill🔗Link</h1>
            <h3><b>Hello {formData.namefirst}</b></h3>
            <div className="container">
                <h3>Enter Your Requirement</h3>
                <form onSubmit={handleSubmit}>
                    {/* Service Dropdown */}
                    <div className="form-group">
                        <label htmlFor="skills">Service</label>
                        <select className="form-control" id="skills" name="skills" value={formData.skills} onChange={handleChange}>
                            <option value="">-- Select a Service --</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Cleaner">Cleaner</option>
                            <option value="Gardener">Gardener</option>
                            <option value="Painter">Painter</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Pest Controller">Pest Controller</option>
                        </select>
                        {errors.skills && <small className="error-text">{errors.skills}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="wages">Wages</label>
                        <input type="number" className="form-control" id="wages" name="wages" value={formData.wages} onChange={handleChange} />
                        {errors.wages && <small className="error-text">{errors.wages}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                        {errors.address && <small className="error-text">{errors.address}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} />
                        {errors.date && <small className="error-text">{errors.date}</small>}
                    </div>

                    <button type="submit" className="btn btn-primary">Add Service</button>
                </form>
            </div>
        </center>
    );
};

=======

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

>>>>>>> 46ba9eede7676c012172c47de464e3e7d18af378
export default ServiceForm;
