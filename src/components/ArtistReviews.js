import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getArtistReviewsFromApi } from '../redux/actionCreators';
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import ReviewPreviewCard from './ReviewPreviewCard';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function ArtistReviews() {
  const navigate = useNavigate();
  let { artist } = useParams();
  let currUser = useSelector(store => store.currUser);
  let [artistReviews, setArtistReviews] = useState([]);


  useEffect(() => {
    async function getArtistReviews(artist) {
      let res = await axios.get(`${BASE_URL}/reviews/artists/${artist}`);
      console.log(artist)
      console.log(res)
      setArtistReviews(res.data);
    }
    try {
      getArtistReviews(artist);
    }
    catch {
      navigate('/error');
    }

  }, [artist])

  console.log(artistReviews);

  if (currUser.noUser) {
    return (
      <div>
        <h1>Reviews</h1>
        <h2>You must be logged in to see reviews.</h2>
      </div>
    )
  }
  return (
    <div className="new-reviews-full-container">
      <h1>Reviews</h1>
      <div className='new-reviews-full-flex'>
        {artistReviews && artistReviews.map((r) =>
          <ReviewPreviewCard title={r.title} album_art={r.album_art} description={r.description}
            album_artist={r.album_artist} id={r.id} review_username={r.review_username}
            body={r.body} review_date={r.review_date} rating={r.rating}
            album_name={r.album_name} />)}
      </div>


    </div>
  );
}

export default ArtistReviews;