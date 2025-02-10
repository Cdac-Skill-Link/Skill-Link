import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "./navigate";

export default function BookingTable() {
  const [slist, setslist] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState(
    JSON.parse(sessionStorage.getItem("confirmedBookings")) || {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7373/bookingList/getall/${sessionStorage["userId"]}`
        );
        setslist([...result.data]);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (bookingid, requirementId, skill, wages, sid, date, address) => {
    // Prevent clicking if already confirmed or cancelled
    const booking = slist.find((ob) => ob.bookingid === bookingid);
    if (booking?.status === "success" || booking?.status === "failure") {
      return;
    }

    // Update blist with the necessary data
    const blist = {
      namefirst: sessionStorage["namefirst"],
      namelast: sessionStorage["namelast"],
      phonenumber: sessionStorage["phonenumber"],
      date: date,
      address: address,
      sid: sid,
      wages: wages,
    };

    try {
      // Send confirmation data to the server
      await axios.post("http://localhost:7373/serviceprovider/addconfirmdata", blist);

      // Update booking status to "success"
      await axios.post(`http://localhost:7373/bookingList/status/${bookingid}`, "success=");

      // Update other bookings with the same requirementId to "failure"
      await axios.post(
        `http://localhost:7373/bookingList/updateStatuses/${bookingid}/${requirementId}`
      );

      // Update frontend state
      const updatedSlist = slist.map((ob) =>
        ob.requirementId === requirementId
          ? { ...ob, status: ob.bookingid === bookingid ? "success=" : "failure" }
          : ob
      );

      setslist(updatedSlist);

      // Update session storage
      const updatedConfirmed = {};
      updatedSlist.forEach((ob) => {
        updatedConfirmed[ob.bookingid] =
          ob.status === "success=" ? "Confirmed" : "Cancelled";
      });

      setConfirmedBookings(updatedConfirmed);
      sessionStorage.setItem("confirmedBookings", JSON.stringify(updatedConfirmed));
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <div>
      <Navigate />
      <br />
      <center style={{ marginTop: "40px" }}>
        <h3>Service Provider List who accepted your request</h3>
      </center>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Skills</th>
            {/* <th>Rating</th> */}
            <th>Confirm</th>
            <th>Status</th>
            {/* <th>Rating</th> */}
          </tr>
        </thead>
        <tbody>
          {slist.map((ob) => (
            <tr key={ob.bookingid}>
              <td>{ob.namefirst}</td>
              <td>{ob.namelast}</td>
              <td>{ob.phonenumber}</td>
              <td>{ob.skills}</td>
              {/* <td>{ob.rating}/5</td> */}
              <td>
                <button
                  type="button"
                  className={`btn ${
                    ob.status === "success="
                      ? "btn-success"
                      : ob.status === "failure"
                      ? "btn-danger"
                      : "btn-primary"
                  }`}
                  disabled={ob.status === "success=" || ob.status === "failure"}
                  onClick={() => handleAccept(ob.bookingid, ob.requirementId, ob.skills, ob.wages, ob.sid, ob.date, ob.address)}
                >
                  {ob.status === "success="
                    ? "Confirmed"
                    : ob.status === "failure"
                    ? "Cancelled"
                    : "Confirm"}
                </button>
              </td>
              <td>{ob.status}</td>
              {/* <td>
                <Link to={`/feedback/${ob.sid}/${ob.namefirst}`}>
                  <button type="button" className="btn btn-info">Rate</button>
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
