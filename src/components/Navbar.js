import '../css/navbar.css';
import spotify_logo from '../assets/reviewify_final.PNG';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";



function Navbar() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let currUser = useSelector(store => store.currUser);


  async function doLogout() {

    let result = await axios.post(`${BASE_URL}/auth/logout`);
    dispatch({
      type: "LOGOUT-CURR-USER"
    })
    navigate("/");
  }



  return (
    <div className="nav-container">
      <div className='logo-div'>
        <img className='spotify-logo' src={spotify_logo}></img>
      </div>
      <div className='nav-flex'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/search">Add A Review</Link>
        <Link className='link' to="/reviews/artists">All Reviews</Link>
        {/* <Link className='link' to ="/reviews">Reviews</Link> */}
        <Link className='link' to="/review-search">Reviews Search</Link>
        {currUser.isUser && <Link className='link' to={`/users/${currUser.isUser}`}>My Profile</Link>}
        {currUser.isUser && <Link to="/" className='link' onClick={doLogout}>Logout {currUser.isUser}</Link>}
        {/* {currUser.isUser && <button className='link-btn' onClick={doLogout}>Logout</button>} */}
      </div>
    </div>
  );
}

export default Navbar;