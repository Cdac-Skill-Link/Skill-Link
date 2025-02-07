import React, { useState ,useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './Feedback.css'; // Import the CSS file
import {useNavigate, useParams} from 'react-router-dom'

import axios from 'axios';



const FeedbackForm = () => {
  
    const params=useParams();
    const navigate=useNavigate();
  const [rating, setRating] = useState(null);
    console.log( "sid=>"+params.id);
// var name =params.name;
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };
const [complete,setcomplete] =useState(false);
  const handleSubmit = async () => {
    if (rating !== null) {
        try {
          console.log("inside try")
            await axios.post(`http://localhost:7373/skilllink/addRating/${params.id}/${rating}`);
            console.log('Rating submitted successfully:', rating);
            setcomplete(true);
            navigate("/servicelist")
            alert("you have rated "+rating+" star to"+ params.name +"  ThankYou stay happy ")
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    } else {
      alert("Please select a rating");
        console.warn('Rating is null. Please select a rating before submitting.');
    }
};


  return (
    <div>
    <div className="feedback-form">
      <h2>Feedback Form</h2>
      <p>Please provide your rating to {params.name}</p>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="rating"
              value={value}
              onChange={() => handleRatingChange(value)}
            />
            <FaStar
              color={value <= rating ? 'gold' : 'lightgray'}
              size={25}
              style={{ margin: '0.1em' }}
            />
          </label>
        ))}
      </div>
          <center>
      <button onClick={handleSubmit}>Submit Feedback</button>
      {/* {complete}?<h1>ThankYou</h1>:<></> */}
      </center>
      
    </div>
    {/* <Gallery  /> */}
    </div>
  );
};

export default FeedbackForm;
