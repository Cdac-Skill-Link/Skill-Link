import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ConfirmTable() {
  const navigate = useNavigate();
  const [slist, setslist] = useState([]);

 

//   const handleAccept = (userId,requirementId) => {
//     if (!disabledButtons[requirementId]) {
//       // Assuming `userId` is the user ID associated with the button
//       setblist((prevBlist) => ({
//         ...prevBlist,
//         userid: userId,
//         requirementId:requirementId
//       }));
      
//       setDisabledButtons((prevDisabledButtons) => ({
//         ...prevDisabledButtons,
//         [requirementId]: true,
//       }));
//     }
//   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "http://localhost:7373/serviceprovider/confirmdata/" +
            sessionStorage["s"]
        );
        // const{requirementId}=result;
       
        console.log(result.data);
        setslist([...result.data]);
      } catch (err) {
        console.log("error occurred", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount



  

  return (
    <div>
    <br></br>
    
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope='col'>Name First</th>
      <th scope='col'>Name Last</th>
      <th scope='col'>Phone number</th>
      {/* <th scope="col">Skills</th> */}
      <th scope="col">Wages</th>
      <th scope="col">Address</th>
      <th scope="col">Date</th>
      {/* <th>checkbox</th> */}
      {/* <th>action</th> */}
      
    </tr>
  </thead>
  <tbody>
    {slist.map((ob)=><tr>
      <td>{ob.namefirst}</td>
      <td>{ob.namelast}</td>
      <td>{ob.phonenumber}</td>
      {/* <td >{ob.skills}</td> */}
      <td>{ob.wages}</td>
      <td>{ob.address}</td>
      <td>{ob.date}</td>
      {/* <input type='checkbox' ={()=>handleUser(ob.userId)} ></input> * */}
      <td> 


&nbsp;&nbsp;&nbsp;
{/*         
        <Link to={`/view/${ob.pid}`}>
        <button type="button" name="btn" id="view" className="btn btn-info"  >Reject</button>
        </Link> */}
      </td>
    </tr>)}
    
  </tbody>
</table>
    </div>
  )
}
