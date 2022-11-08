import '../css/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewPreviewCard from './ReviewPreviewCard';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";

function NewReviewsFull() {

  let [latestReviews, setLatestReviews] = useState([]);
  console.log(latestReviews);


  useEffect(() => {

    async function getLatest() {
      let res = await axios.get(`${BASE_URL}/reviews/latest`);
      setLatestReviews(res.data);

    }
    getLatest()

  }, [])


  return (
    <div className="new-reviews-full-container">
      <h2>Hot Off The Presses</h2>
      <h3>Real Listeners. Real Opinions.</h3>
      <div className='new-reviews-full-flex'>
        {latestReviews && latestReviews.map((r) =>
          <ReviewPreviewCard title={r.title} album_art={r.album_art}
            album_artist={r.album_artist} id={r.id} review_username={r.review_username}
            body={r.body} review_date={r.review_date} rating={r.rating}
            album_name={r.album_name} />)}
      </div>
    </div>
  );
}

export default NewReviewsFull;
