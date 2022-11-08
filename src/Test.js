import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";


function Test() {
    const dispatch = useDispatch();
    let user = useSelector(store => store.user);
   

    let location = useLocation();


    function getAccessCode(data){
        let string = data.search;
        let arr = string.split('=');
        return arr[1];
    }

    let accessCode = getAccessCode(location);

    // useEffect(() => {
    //     async function getCallbackRes(code){
    //         let result = await axios.get(`http://localhost:5000/auth/callback?code=${code}`);
    //         dispatch({type: "USER-LOGIN",
    //                 payload: result.data})
             
    //      }
    //      getCallbackRes(accessCode);
         
    // }, [accessCode])

  //  if(user && user.user){
 
  //   localStorage.setItem("token", `${user.token.access_token}`);
  //   localStorage.setItem("refreshToken", `${user.token.refresh_token}`);
  //  }


  return (
    <div className="App">
     <h1>Test Page</h1>
     <Link to ="/search">Click</Link>
      
    </div>
  );
}

export default Test;

// useEffect(() => {
//     async function getCallbackRes(code){
//         let result = await axios.get(`http://localhost:5000/auth/callback?code=${code}`);
//     setCurrentUser(result.data.userDetails.display_name);
//      setAccessToken(result.data.tokenDetails.access_token);
         
//      }
//      getCallbackRes(accessCode);
     
// }, [accessCode])

// const [currentUser, setCurrentUser] = useState(null);
// const [accessToken, setAccessToken] = useState(null);