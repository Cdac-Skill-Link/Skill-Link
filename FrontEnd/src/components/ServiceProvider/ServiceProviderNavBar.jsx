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
                        👤{namefirst}
                    </a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
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
                </div>
            </div>
            
        </nav>
        <style>
                {`
                    .active-link {
    border-bottom: 3px solid #6182FE; /* Underline effect */
                        font-weight: bold;
                        color: #6182FE;
}`}</style>
    
               
        </>
    );
};
