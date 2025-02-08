import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigate = () => {
    const username = sessionStorage["username"];
    const namefirst = sessionStorage["namefirst"];
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <>
            <nav id="menu" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand page-scroll" href="#page-top">
                            👤 {namefirst}
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className={location.pathname === "/ServiceForm" ? "active-nav" : ""}>
                                <a href="/ServiceForm" className="page-scroll">
                                    Get Service
                                </a>
                            </li>
                            <li className={location.pathname === "/RequestService" ? "active-nav" : ""}>
                                <a href="/RequestService" className="page-scroll">
                                    Requested Services
                                </a>
                            </li>
                            <li className={location.pathname === "/bookedservices" ? "active-nav" : ""}>
                                <a href="/bookedservices" className="page-scroll">
                                    Booked Services
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={handleLogout}>
                                    LogOut
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Add CSS styles */}
            <style>
                {`
                    .active-nav a {
                        border-bottom: 3px solid #6182FE; /* Underline effect */
                        font-weight: bold;
                        color: #6182FE;
                    }

                    .nav.navbar-nav li a {
                        transition: all 0.3s ease;
                    }
                `}
            </style>
        </>
    );
};
