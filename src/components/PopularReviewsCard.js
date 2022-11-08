import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";


function PopularReviewsCard({ popularReviewSample }) {
  console.log('pop')


  return (
    <div className='trans-box-artist-feature'>
      <div className="carousel-headings">
        <h2>Join The Conversation</h2>
        <h3>These reviews got the discussion going.</h3>
        <Link className='carousel-link' to="/popular">See More Most Popular Reviews</Link>

      </div>
    </div>
  );
}

export default PopularReviewsCard;
