import '../css/App.css';
import '../css/Form.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewPreviewCard from './ReviewPreviewCard';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function ExistingReviewSearch() {
  let currUser = useSelector(store => store.currUser);

  let navigate = useNavigate();

  const [searchFormData, setSearchFormData] = useState({ search: '' });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setSearchFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }


  async function handleSearchSubmit(evt) {
    evt.preventDefault();

    let data = await axios.get(`${BASE_URL}/reviews/search/${searchFormData.search}`)
    console.log(data)
    if (data.data.message) {
      console.log('message')
      navigate('/');
    }
    else {
      setSearchFormData({ search: '' });
      setSearchResults(data.data);
    }

  }


  if (currUser && currUser.noUser) {
    return (
      <div>
        <h1>Please login</h1>
      </div>)
  }

  return (
    <div className="new-reviews-full-container">
      <h1>Search Our Existing Reviews</h1>
      <form onSubmit={handleSearchSubmit}>
        <input type='text' placeholder="Album Name or Review Title" name="search" value={searchFormData.search} onChange={handleChange}></input>
        <button className='add-review-form-button'>Submit</button>
      </form>
      <div className='new-reviews-full-flex'>
        {searchResults &&
          searchResults.map((r) =>
            <ReviewPreviewCard title={r.title} album_art={r.album_art}
              album_artist={r.album_artist} id={r.id} review_username={r.review_username}
              body={r.body} review_date={r.review_date} rating={r.rating}
              album_name={r.album_name} />)}
      </div>

    </div>
  );
}

export default ExistingReviewSearch;