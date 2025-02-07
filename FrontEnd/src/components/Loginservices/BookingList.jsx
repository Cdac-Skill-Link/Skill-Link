import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from './navigate';
import { BookingNavbar } from './BookingListNavBar';
import FeedbackForm from './Rating';
export default function BookingTable() {
  const navigate = useNavigate();
  const [slist, setslist] = useState([]);
  const [bookid, setbookid] = useState()
  const [requid,setrequid]=useState()
  const [blist, setblist] = useState({
    
    namefirst: sessionStorage["namefirst"],
    namelast: sessionStorage["namelast"],
    phonenumber: sessionStorage["phonenumber"],
   
    date:"",
    address:"",
    sid: "",
    wages:"",
    
  });
 
  // const handleRefresh=()=>{
  //   console.log("inside refresh")
  //   navigate("/bookedservices")
  // }
  const handleAccept = async (bookingid, skill, wages, sid, date, address, requirementId) => {
    console.log("Inside handleAccept " + bookingid + " " + wages + " " + sid + " " + date + " " + address);
  
    // Update blist with the necessary data
    setblist({
      ...blist,
      date: date,
      sid: sid,
      wages: wages,
      address: address
    });
  console.log(blist)
    setrequid(requirementId);
    setbookid(bookingid);
  
    // Assuming `axios.post` is asynchronous, you can wait for it to finish before proceeding
    await axios.post("http://localhost:7373/serviceprovider/addconfirmdata", blist);
  };
  

  const a="success";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:7373/bookingList/getall/" +
            sessionStorage["userId"]
        );

        console.log(result.data);
        setslist([...result.data]);
       
      } catch (err) {
        console.log("error occurred", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const postData = async () => {
      try {
       
        await axios.post("http://localhost:7373/bookingList/status/" + bookid, a);
        
        
        await axios.delete("http://localhost:7373/bookingList/removedata/" + requid);
        // Assuming you want to navigate after a successful request
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Check if bookid and requid are truthy before making the POST request
    if (bookid && requid) {
      postData();
    }
  }, [bookid, requid, navigate]);
  

  

  return (
    <div>
       <BookingNavbar/>
        <br/>
        <br/>
        <br/>
    
    <center>
    <h3 >Service Provider List who accepted your request</h3> 
    </center>
    {/* <Link to="/form">
       <button type="button" name="btn" id="btn" className="btn btn-success"> Add new Product</button>
    </Link> */}
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope='col'>Name First</th>
      <th scope='col'>Name Last</th>
      <th scope='col'>Phone number</th>
      <th scope="col">Skills</th>
      <th scope="col">Rating</th>
     
      {/* <th>checkbox</th> */}
      <th>Confirm</th>
      <th>Status</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    {slist.map((ob)=><tr>
      <td>{ob.namefirst}</td>
      <td>{ob.namelast}</td>
      <td>{ob.phonenumber}</td>
      <td >{ob.skills}</td>
      <td>{ob.rating}/5</td>
      
      {/* <input type='checkbox' ={()=>handleUser(ob.userId)} ></input> * */}
      <td> 

        {/* <button type="button" name="btn" id="delete"  className="btn btn-danger" onClick={()=>{deleteProduct(ob.pid)}}>delete</button>&nbsp;&nbsp;&nbsp; */}
        {/* <Link to={`/edit/${ob.pid}`} state={{pdata:ob}}> */}
     
    
        <button
  type="button"
  name="userId"
  className="btn btn-primary"
  
  onClick={()=>handleAccept(ob.bookingid,ob.skills,ob.wages,ob.sid,ob.date,ob.address,ob.requirementId)}
>
  confirm
</button>
 

&nbsp;&nbsp;&nbsp;
        
       
      </td>
      <td>{ob.status}</td>
      <Link to={`/feedback/${ob.sid}/${ob.namefirst}`}>
        <button type="button" name="btn" id="view" className="btn btn-info"  >Rating</button>
        </Link>
    </tr>)}

    
  </tbody>
</table>
    </div>
  )
}
