import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const ServiceProviderNavbar = () => {
    const namefirst = sessionStorage["namefirst"];
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
      <>
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    {/* Skill🔗Finder on the left */}
                    <NavLink className="navbar-brand page-scroll brand-spacing" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                        <i className="fa fa-arrow-circle-o-left fa-lg" aria-hidden="true"></i>
                    </NavLink>
                    <a className="navbar-brand brand-spacing" href="#page-top">
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

                <div className="collapse navbar-collapse">
                    {/* Centered navigation links */}
                    <ul className="nav navbar-nav navbar-middle">
                        <li>
                            <NavLink to="/data" className={({ isActive }) => isActive ? "active-link" : ""}>
                                User Request
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/confirmList" className={({ isActive }) => isActive ? "active-link" : ""}>
                                Confirm List
                            </NavLink>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>LogOut</a>
                        </li>
                    </ul>

                    {/* NameFirst remains on the right */}
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
                .active-link {
                    border-bottom: 3px solid #6182FE;
                    font-weight: bold;
                    color: #6182FE;
                }

                /* Skill🔗Finder on the left */
                .brand-spacing {
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: auto;
                }

                /* Center navigation links */
                .navbar-middle {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 20px;
                }

                /* NameFirst on the right */
                .user-name {
                    font-size: 22px;
                    font-weight: bold;
                    color: #333;
                    padding-left: 30px;
                }
            `}
        </style>
      </>
    );
};
