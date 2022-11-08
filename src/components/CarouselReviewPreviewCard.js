import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Star from './Star';


function CarouselReviewPreviewCard({ album_art, album_artist,
  album_id, album_name, body, description, id, rating, review_date, review_username, title }) {

  function createStars(n) {
    let starsArr = [];
    for (let i = 0; i < n; i++) {
      starsArr.push(<Star className='star-icon'
        size={'30px'}
      ></Star>)
    }
    return starsArr;
  }



  return (
    <div className="carousel-review-preview-card">
      <Link className='review-card-link' to={`/reviews/${id}`}>
        <div className="carousel-review-preview-card-header">
          <h4 className='review-preview-card-h3-rev'>{title}</h4>
          {/* <h6 className='review-preview-card-h3-rev'>{album_name} by {album_artist}</h6> */}
        </div>
        <div className='carousel-preview-card-img-wrapper'>
          <img className="carousel-preview-card-img" src={album_art} alt='album-artwork'></img>
        </div>
        <div className='carousel-review-preview-card-body'>
          <div className='review-card-stars-rev'>{createStars(rating)}</div>
          <p className='review-card-description-rev'>{description &&
            description.length > 75 ? description.slice(0, 75) + '...' : description}</p>
        </div>
      </Link>
    </div>
  );
}

export default CarouselReviewPreviewCard;