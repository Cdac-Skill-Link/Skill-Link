import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigate = () => {
    const username = sessionStorage["username"];
    const namefirst = sessionStorage["namefirst"];
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <>
            <nav id="menu" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {/* Skill🔗Finder logo with spacing */}
                        <a className="navbar-brand page-scroll brand-spacing" href="#page-top">
                            Skill🔗Finder
                        </a>

                        {/* Navigation toggle button for mobile */}
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
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {/* Centered navigation links */}
                        <ul className="nav navbar-nav navbar-center">
                            <li className={location.pathname === "/ServiceForm" ? "active-nav" : ""}>
                                <a href="/ServiceForm" className="page-scroll">Get Service</a>
                            </li>
                            <li className={location.pathname === "/RequestService" ? "active-nav" : ""}>
                                <a href="/RequestService" className="page-scroll">Requested Services</a>
                            </li>
                            <li className={location.pathname === "/bookedservices" ? "active-nav" : ""}>
                                <a href="/bookedservices" className="page-scroll">Booked Services</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleLogout}>LogOut</a>
                            </li>
                        </ul>

                        {/* Symbol & NameFirst with spacing at the right */}
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a className="user-name">
                                    👤 <span>{namefirst}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* CSS Styles */}
            <style>
                {`
                    .active-nav a {
                        border-bottom: 3px solid #6182FE;
                        font-weight: bold;
                        color: #6182FE;
                    }

                    .nav.navbar-nav li a {
                        transition: all 0.3s ease;
                    }

                    /* Spacing for Skill🔗Finder */
                    .brand-spacing {
                        margin-right: 50px; /* Adjust spacing between Skill🔗Finder and links */
                        font-size: 18px;
                        font-weight: bold;
                    }

                    /* Style for NameFirst at the end */
                    .user-name {
                        font-size: 22px;
                        font-weight: bold;
                        color: #333;
                        padding-left: 30px; /* Space between services and NameFirst */
                    }

                    /* Center navigation links */
                    .navbar-nav {
                        display: flex;
                        justify-content: center;
                        flex-grow: 1;
                    }
                `}
            </style>
        </>
    );
};
