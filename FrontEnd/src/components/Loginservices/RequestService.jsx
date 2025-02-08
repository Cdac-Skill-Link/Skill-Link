import axios from "axios";
import { useState, useEffect } from "react";
import "./RequestService.css";
import { Navigate } from "./navigate";

const RequestService = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                console.log(userId);
                const response = await axios.get(`http://localhost:7373/skilllink/getUserRequirements/${userId}`);
                setServices(response.data);
            } catch (err) {
                setError("Failed to fetch services. Please try again later.");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <>
        <Navigate/>
        <center className="service-center">
            <h1>Skill🔗Link</h1>
            <h3>Your Service Requests</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : services.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                <div className="table-container">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Wages</th>
                                <th>Address</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.skills}</td>
                                    <td>{service.wages}</td>
                                    <td>{service.address}</td>
                                    <td>{service.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </center>
        </>
    );
};

export default RequestService;
