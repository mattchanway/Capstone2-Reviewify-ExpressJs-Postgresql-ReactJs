import '../css/App.css';
import '../css/Form.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddReviewForm from './AddReviewForm';
import SearchResultCard from './SearchResultCard';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function ReviewSearchAndSelect() {
  let dispatch = useDispatch();

  let currUser = useSelector(store => store.currUser);


  let navigate = useNavigate();
  let INIT_STATE = {
    title: '', description: '', body: '', rating: 1, album_id: '', album_name: '',
    album_art: '', artist_id: ''
  };
  const [searchFormData, setSearchFormData] = useState({ search: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [reviewBeingWritten, setReviewBeingWritten] = useState(false);
  const [reviewFormData, setReviewFormData] = useState(INIT_STATE);

  async function doLogout() {
    let result = await axios.post(`${BASE_URL}/auth/logout`);
    dispatch({
      type: "LOGOUT-CURR-USER"
    })
    navigate("/");
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setSearchFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }

  const handleReviewChange = evt => {
    const { name, value } = evt.target;
    setReviewFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }

  function handleStarsChange(numStars) {

    setReviewFormData(fData => ({
      ...fData,
      rating: numStars
    }))

  }



  async function handleSearchSubmit(evt) {
    evt.preventDefault();

    try {
      let data = await axios.get(`${BASE_URL}/auth/search/${searchFormData.search}`)

      if (data.data.message) {
        await doLogout();
        window.location.replace(`${BASE_URL}/auth/login`)
      }
      else {
        setSearchFormData({ search: '' });
        setSearchResults(data.data);
      }
    }
    catch {
      navigate("/error");
    }

  }

  async function handleReviewSubmit(evt) {
    evt.preventDefault();
    // redundant unpacking
    try {
      let { title, artist_id, description, body, rating,
        album_id, album_name, album_art, album_artist } = reviewFormData;

      let newReviewResp = await axios.post(`${BASE_URL}/reviews`, {
        title, description, body, rating, album_id,
        artist_id, album_name, album_art, album_artist
      });
      if (newReviewResp.data.message) {
        await doLogout();
        window.location.replace(`${BASE_URL}/auth/login`)
      }
      let newId = newReviewResp.data[0].id
      navigate(`/reviews/${newId}`);
    }
    catch {
      navigate("/error");
    }

  }

  function selectAlbumNameForReview(data) {

    let { name, art, albumId, artist, artistId } = data;

    setReviewFormData(fData => ({
      ...fData,
      album_name: name,
      album_art: art,
      album_id: albumId,
      artist_id: artistId,
      album_artist: artist
    }));
    setReviewBeingWritten(true);
  }



  if (currUser && currUser.noUser) {
    return (
      <div>
        <h1>Please login</h1>
      </div>

    )


  }

  return (
    <div className="review-search-and-select-container">
      <h1>Find an Album and Let The World Know Your Thoughts! </h1>
      {reviewBeingWritten &&
        <AddReviewForm handleStarsChange={handleStarsChange} handleReviewSubmit={handleReviewSubmit} handleReviewChange={handleReviewChange} reviewFormData={reviewFormData} />
      }
      <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search Term" name="search" value={searchFormData.search} onChange={handleChange}></input><br></br>
        <button className='add-review-form-button'>Find Albums</button>
      </form>
      {searchResults &&
        <div className='search-results-container'>{
          searchResults.map(r =>
            <SearchResultCard albumName={r.name} artistName={r.artists[0].name
            } artwork={r.images[1].url} selectAlbumNameForReview={selectAlbumNameForReview}
              artistId={r.artists[0].id} albumId={r.id}
            ></SearchResultCard>

          )}</div>}


    </div>
  );
}

export default ReviewSearchAndSelect;