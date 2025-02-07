import React from "react";
import { useNavigate } from "react-router-dom";
export const Navigate = (props) => {
    const username=sessionStorage["username"];
    const namefirst=sessionStorage["namefirst"];
    const userId=sessionStorage["userId"]
    const navigate=useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        // Perform logout logic (clear authentication)
        //  setIsLoggedIn(false);
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
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
          👤{namefirst}
          </a>{" "}
        </div>
       
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="ServiceForm" className="page-scroll">
                Get Service
              </a>
            </li>
            <li>
              <a href="bookedservices" className="page-scroll">
                Booked Services
              </a>
            </li>
            <li>
              <a href=""  onClick={handleLogout}>
                LogOut
              </a>
             
            </li>
           
           
         
          </ul>
        </div>
      </div>
    </nav>
  
    </>
  );
};
