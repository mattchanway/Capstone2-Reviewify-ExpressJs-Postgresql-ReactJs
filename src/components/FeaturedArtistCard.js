import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function FeaturedArtistCard({ artist }) {

  return (
    <div className='trans-box-artist-feature'>
      <div className="carousel-headings">
        <h2>Ready To Try Something New?</h2>
        <h3>{artist.album_artist} Reviews</h3>
        <Link className='carousel-link' to={`/reviews/artists/${artist.album_artist}`}>Check {artist.album_artist} Reviews</Link>
      </div>
    </div>
  );
}

export default FeaturedArtistCard;