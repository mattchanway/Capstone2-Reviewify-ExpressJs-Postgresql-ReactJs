import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Star from './Star';


function ReviewPreviewCard({ album_art, album_artist,
  album_id, album_name, body, description, id, rating, review_date, review_username, title }) {

  function createStars(n) {
    let starsArr = [];
    for (let i = 0; i < n; i++) {
      starsArr.push(<Star size={'25px'}></Star>)
    }
    return starsArr;
  }


  return (
    <div className="review-preview-card-rev">
      <Link className='review-preview-card-wrapper-link' to={`/reviews/${id}`}>
        <div className="review-preview-card-header-rev">
          <h4 className='review-preview-card-h3-rev'>{title}</h4>
          <h6 className='review-preview-card-h3-rev'>{album_name} by {album_artist}</h6>

        </div>
        <div className='preview-card-img-wrapper-rev'>
          <img className="preview-card-img-rev" src={album_art} alt='album-artwork'></img>
        </div>
        <div className='review-preview-card-body-rev'>
          <div className='review-card-stars-rev'>{createStars(rating)}</div>
          <p className='review-card-description-rev'>{description
            && description.length > 60 ? description.slice(0, 75) + '...' : description}</p><br></br>
          <h4 className='review-preview-card-author'>@{review_username}</h4>
        </div>
      </Link>
    </div>
  );
}

export default ReviewPreviewCard;