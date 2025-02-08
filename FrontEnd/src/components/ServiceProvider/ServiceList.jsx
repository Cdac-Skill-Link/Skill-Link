import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceTable() {
  const navigate = useNavigate();
  const [slist, setslist] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(
    JSON.parse(sessionStorage.getItem("disabledButtons")) || {}
  );

  const [blist, setblist] = useState({
    sid: sessionStorage["s"],
    namefirst: sessionStorage["namefirst"],
    namelast: sessionStorage["namelast"],
    phonenumber: sessionStorage["phonenumber"],
    skills: sessionStorage["skills"],
    date: "",
    rating: sessionStorage["rating"],
    address: "",
    userid: "",
    wages: "",
    requirementId: sessionStorage["reqID"]
  });

  const handleAccept = (userId, requirementId, date, wages, address) => {
    if (!disabledButtons[requirementId]) {
      setblist(prevBlist => ({
        ...prevBlist,
        address,
        wages,
        date,
        userid: userId,
        requirementId
      }));

      // Show an alert
      alert("Request Sent!");

      // Update sessionStorage to keep "Pending" state after refresh
      const updatedButtons = { ...disabledButtons, [requirementId]: true };
      setDisabledButtons(updatedButtons);
      sessionStorage.setItem("disabledButtons", JSON.stringify(updatedButtons));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:7373/serviceprovider/getallRequirements/" +
            sessionStorage["skills"]
        );
        setslist([...result.data]);
      } catch (err) {
        console.log("Error occurred", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const postData = async () => {
      try {
        await axios.post("http://localhost:7373/bookingList/addData", blist);
        navigate("");
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (blist.userid) {
      postData();
    }
  }, [blist.userid, navigate]);

  return (
    <div>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope='col'>Name First</th>
            <th scope='col'>Name Last</th>
            <th scope='col'>Phone number</th>
            <th scope="col">Skills</th>
            <th scope="col">Wages</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {slist.map(ob => (
            <tr key={ob.requirementId}>
              <td>{ob.namefirst}</td>
              <td>{ob.namelast}</td>
              <td>{ob.phonenumber}</td>
              <td>{ob.skills}</td>
              <td>{ob.wages}</td>
              <td>{ob.address}</td>
              <td>{ob.date}</td>
              <td>
                <button
                  type="button"
                  className={`btn ${disabledButtons[ob.requirementId] ? "btn-secondary" : "btn-primary"}`}
                  disabled={disabledButtons[ob.requirementId]}
                  onClick={() => handleAccept(ob.userId, ob.requirementId, ob.date, ob.wages, ob.address)}
                >
                  {disabledButtons[ob.requirementId] ? "Pending" : "Accept"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
