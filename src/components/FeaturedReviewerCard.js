import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function FeaturedReviewerCard({ reviewer }) {


  console.log('render')
  return (
    <div className='trans-box-artist-feature'>
      <div className="carousel-headings">
        <h2>Hear From A Top Reviewer</h2>
        <h3>{reviewer.username} is a top reviewer.</h3>
        <Link className='carousel-link' to={`/users/${reviewer.username}`}>Check their reviews out!</Link>
      </div>
    </div>
  );
}

export default FeaturedReviewerCard;