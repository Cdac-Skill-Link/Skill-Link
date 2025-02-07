

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import * as serviceWorker from './serviceWorker';
import { Contact } from './components/contact';
// // import UserLogin from './components/Login';
// // import App5 from './Login page/App5';

import Registration from './components/userRegistration';
import ServiceLogin from './components/serviceProviderLogin';
import { ServiceList } from './components/Loginservices/ServiceList';
import JsonData from "./data/data.json";
import LandingPage from "./components/Landingpage";
import Login from './components/UserLogin';
import ServiceForm from './components/Loginservices/ServiceForm';
import ServiceRegistration from "./components/serviceProviderRegistration"
import ServiceTable from './components/ServiceProvider/ServiceList';

import { ServiceproviderPage } from './components/ServiceProvider/ServiceProviderPage';
import BookingTable from './components/Loginservices/BookingList';
import ConfirmTable from './components/ServiceProvider/ConfirmList';
import ForgotPassword from './components/Loginservices/forgotPassword';
import FeedbackForm from './components/Loginservices/Rating';
import ServiceForgotPassword from './components/ServiceProvider/ServiceForgotPassword';


const App = () => {

  const AuthorizedService=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> : <Login/>
  }

  const Authorizedrequest=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> :<Login/>
  }
  const Authorizedserviceform=()=>{
    const status=sessionStorage["status"]
    return status==="success"?<ServiceForm/>:<Login/>
  }
  const AuthorizedBookingList=()=>{
    const status=sessionStorage["status"]
    return status==="success"?<BookingTable/>:<Login/>
  }
  const Authorizedserviceprovider=()=>{
    const status=sessionStorage["status"]
    return status ==="ServiceLoginsuccess"?<ServiceproviderPage/>:<ServiceLogin/>
  }
  const AuthorizedconfirmTable=()=>{
    const status=sessionStorage["status"]
    return status==="ServiceLoginsuccess"?<ServiceproviderPage/>:<ConfirmTable/>
  }


  return (
    <div>
<BrowserRouter>
    <Routes>
    
      <Route path="/" element={<LandingPage></LandingPage>}/>
      <Route path="login" element={<Login></Login>}/> 
      <Route path="register" element={<Registration></Registration>}/>
    
      <Route path="/servicelist" element={<AuthorizedService/>}/>
      <Route path="/servicerequest" element={<Authorizedrequest/>}/>
      <Route path="/serviceform" element={<Authorizedserviceform/>}/>
      <Route path="/serviceprovider" element={<ServiceLogin></ServiceLogin>}/>
      <Route path="/ServiceProviderregister" element={<ServiceRegistration></ServiceRegistration>}/>
      <Route path="/data"   element={<Authorizedserviceprovider/>}/>
      <Route path="/bookedservices" element={<AuthorizedBookingList/>}/>
      <Route path="/confirmList" element={<ConfirmTable/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/feedback/:id/:name" element={<FeedbackForm/>}/>
      <Route path="/seviceforgotpass" element={<ServiceForgotPassword/>}/>
   
    </Routes>
    </BrowserRouter> 

    </div>
  );
};

export default App;
