import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArtistPreviewCard from './ArtistPreviewCard';
import AlphabetNav from './AlphabetNav';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";

function ArtistIndex() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let currUser = useSelector(store => store.currUser);
  let [alphabetSearchActive, setAlphabetSearchActive] = useState(false);
  let [alphabetizedArtists, setAlphabetizedArtists] = useState([]);
  let [artistList, setArtistList] = useState([]);


  useEffect(() => {
    async function getArtists() {
      let res = await axios.get(`${BASE_URL}/reviews/artists`);
      setArtistList(res.data);
    }
    try {
      getArtists();
    }
    catch {
      navigate('/error');
    }

  }, [])

  function getAlphabetReviews(evt) {
    let letter = evt.target.innerText;
    if (letter === 'All') {
      setAlphabetSearchActive(false);
      setAlphabetizedArtists([]);
    }

    else {
      setAlphabetSearchActive(true);
      setAlphabetizedArtists(artistList.filter(entry => entry.name[0] === letter))
    }
  }


  if (currUser.noUser) {
    return (
      <div>
        <h1>Reviews</h1>
        <h2>You must be logged in to see artists.</h2>
      </div>
    )
  }

  return (
    <div className="new-reviews-full-container">

      <h1>Check Out Music Reviews Of All These Artists</h1>
      <AlphabetNav getAlphabetReviews={getAlphabetReviews}></AlphabetNav>
      <div className="new-reviews-full-flex">

        {artistList && !alphabetSearchActive && artistList.sort((a, b) => {
          if (a.name < b.name) return -1
        }).map((r) =>
          <ArtistPreviewCard artist_id={r.artist_id} artist_name={r.name}
            image={r.image} genre={r.genre}>
          </ArtistPreviewCard>
        )}
        {alphabetSearchActive && artistList && alphabetizedArtists &&
          alphabetizedArtists.sort((a, b) => {
            if (a.name < b.name) return -1
          }).map((r) =>
            <ArtistPreviewCard artist_id={r.artist_id} artist_name={r.name}
              image={r.image} genre={r.genre}>
            </ArtistPreviewCard>)

        }
      </div>


    </div>
  );
}

export default ArtistIndex;