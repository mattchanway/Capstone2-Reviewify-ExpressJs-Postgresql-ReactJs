import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function NewReviewsCard({ newReviewSample }) {

  console.log('new')

  return (
    <div className='trans-box-artist-feature'>
      <div className="carousel-headings">
        <h2>Latest Reviews</h2>
        <h3>Fresh Takes Always Being Added</h3>

        <Link className='carousel-link' to="/new">Check More New Reviews</Link>
      </div>
    </div>
  );
}

export default NewReviewsCard;

