import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


function ArtistPreviewCard({ artist_id, artist_name, image, genre }) {



  return (
    <div className="review-preview-card">
      <Link className='review-card-link' to={`/reviews/artists/${artist_name}`}>
        <div className="review-preview-card-header">
          <h3>{artist_name} Reviews</h3>
        </div>
        <div className='preview-card-img-wrapper'>
          <img className="preview-card-img" src={image} alt='album-artwork'></img>
        </div>
        <div className='review-preview-card-body'>
          <h6>Genre - {genre ? genre : 'N/A'}</h6>
        </div>
      </Link>
    </div>
  );
}

export default ArtistPreviewCard;