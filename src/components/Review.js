import '../css/indivReview.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import ReviewComments from './ReviewComments';
import AddReviewForm from './AddReviewForm';
import Star from './Star';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function Review() {
  let navigate = useNavigate();
  let { reviewId } = useParams();
  let [currReview, setCurrReview] = useState(null);
  let [reviewComments, setReviewComments] = useState(null);
  let [reviewBeingEdited, setReviewBeingEdited] = useState(false);
  let currUser = useSelector(store => store.currUser);
  let INIT_STATE = {
    title: '', description: '', body: '', rating: 1, album_id: '',
    album_name: '', album_art: ''
  };
  const [reviewFormData, setReviewFormData] = useState(INIT_STATE);

  function initEdit() {
    setReviewBeingEdited(!reviewBeingEdited);

  }

  function createStars(n) {
    let starsArr = [];
    for (let i = 0; i < n; i++) {
      starsArr.push(<Star size={'25px'}></Star>)
    }
    return starsArr;
  }


  useEffect(() => {
    async function getReview(id) {
      let res = await axios.get(`${BASE_URL}/reviews/${id}`);
      console.log(res.data)
      setCurrReview(res.data);
      setReviewComments(res.data.comments);
    }
    getReview(reviewId);
  }, [reviewId])

  async function deleteReview(evt) {
    let id = evt.target.id;
    let res = await axios.delete(`${BASE_URL}/reviews/${id}`);

    navigate('/');
  }

  const handleReviewChange = evt => {
    const { name, value } = evt.target;
    setReviewFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }

  async function handleReviewSubmit(evt) {
    evt.preventDefault();
    let { title, description, body, rating } = reviewFormData;

    let newReviewResp = await axios.put(`${BASE_URL}/reviews/${currReview.review.id}`, { title, description, body, rating });
    let editedReview = { review: newReviewResp.data[0] }
    setCurrReview(editedReview);
    setReviewFormData(INIT_STATE);
    setReviewBeingEdited(false);

  }



  if (currReview) return (
    <div className="page-container">
      <div className='review-container'>
        <h1>{currReview.review.title}</h1>
        <h2>{currReview.review.album_name} - {currReview.review.album_artist}</h2>
        <div className='review-album-cover-wrapper'>
          <img className='review-album-img' src={currReview.review.album_art}></img>
        </div>
        <h3>{currReview.review.description}</h3>
        <div className='stars-div'>{createStars(currReview.review.rating)}</div>
        <p>{currReview.review.body}</p>
        <p>Written by: <Link to={`/users/${currReview.review.review_username}`}>{currReview.review.review_username}</Link></p>
        <div className='comments-parent-container'>

          {reviewComments.length && <h2 className='comments-heading'>Comments</h2>}
          <ReviewComments reviewId={reviewId} comments={reviewComments} setReviewComments={setReviewComments} />


          {currReview && currUser.isUser && currUser.isUser === currReview.review.review_username &&
            <button className='edit-review-form-button' onClick={initEdit}>Edit Review</button>}
          {currReview && currUser.isUser && currUser.isUser === currReview.review.review_username &&
            <button className='edit-review-form-button' id={currReview.review.id} onClick={deleteReview}>Delete Review</button>}
        </div>
      </div>
      {reviewBeingEdited &&
        <AddReviewForm handleReviewSubmit={handleReviewSubmit} handleReviewChange={handleReviewChange} reviewFormData={reviewFormData} />}
      <br></br>

    </div>
  );
}

export default Review;