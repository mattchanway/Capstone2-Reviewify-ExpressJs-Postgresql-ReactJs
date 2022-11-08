import '../css/App.css';
import '../css/navbar.css';
import newimage4 from '../assets/newimage4.jpg';
import image2 from '../assets/image2.jpg';
import newimage3 from '../assets/newimage3.jpg';
import featured_reviewer from '../assets/featured_reviewer.jpg';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NewReviewsCard from './NewReviewsCard';
import PopularReviewsCard from './PopularReviewsCard';
import FeaturedArtistCard from './FeaturedArtistCard';
import axios from 'axios';
import FeaturedReviewerCard from './FeaturedReviewerCard';
import ReviewSearchAndSelect from './ReviewSearchAndSelect';
import CarouselReviewPreviewCard from './CarouselReviewPreviewCard';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";
const BASE_LOGIN_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


function Home() {

  let navigate = useNavigate();
  let currUser = useSelector(store => store.currUser);
  let [sampleLatestReview, setSampleLatestReview] = useState([]);
  let [samplePopularReview, setSamplePopularReview] = useState([]);
  let [featuredArtist, setFeaturedArtist] = useState([]);
  let [featuredReviewer, setFeaturedReviewer] = useState([]);
  let [currCarouselIndex, setCurrCarouselIndex] = useState(0);
  let data = [['latest', image2], ['popular', newimage4], ['feature', newimage3], ['reviewer', featured_reviewer]];
  console.log(currUser)

  function redirect() {
    window.location.replace(`${BASE_LOGIN_URL}/auth/login`);
  }

  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    async function getSampleData() {
      let res = await axios.get(`${BASE_URL}/reviews/sample`);
      if (res.data.unauthorized) return;
      let latest = res.data.latest;
      let popular = res.data.popular;
      let artist = res.data.artist;
      let reviewer = res.data.featuredReviewers

      let int1 = getRandomInt(latest.length);
      let int2 = getRandomInt(popular.length);
      let int3 = getRandomInt(artist.length);
      let int4 = getRandomInt(reviewer.length)
      setSampleLatestReview(latest[int1]);
      setSamplePopularReview(popular[int2]);
      setFeaturedArtist(artist[int3]);
      setFeaturedReviewer(reviewer[int4]);
    }
    getSampleData();
  }, [])

  if (currUser.noUser) {
    return (
      <div className="App">
        <h1>Welcome to Reviewify</h1>
        <button className='link-btn' onClick={redirect}>Log In With Spotify</button>
      </div>
    );
  }

  function increment() {
    if (currCarouselIndex === 3) setCurrCarouselIndex(0);
    else { setCurrCarouselIndex(currCarouselIndex => currCarouselIndex + 1); }
  }
  function decrement() {
    if (currCarouselIndex === 0) setCurrCarouselIndex(3);
    else { setCurrCarouselIndex(currCarouselIndex => currCarouselIndex - 1); }
  }
  console.log(sampleLatestReview)

  return (
    <div className="home-container">
      <h1>Welcome to Reviewify</h1>
      <h2>Browse Existing Reviews or Write Your Own</h2>
      <div className='carousel'>
        <img className='carousel-img' src={data[currCarouselIndex][1]}></img>
        {sampleLatestReview && data[currCarouselIndex][0] === 'latest' && <NewReviewsCard newReviewSample={sampleLatestReview}></NewReviewsCard>}<br />
        {sampleLatestReview && data[currCarouselIndex][0] === 'latest' && <CarouselReviewPreviewCard album_art={sampleLatestReview.album_art}
          album_artist={sampleLatestReview.album_artist} album_name={sampleLatestReview.album_name}
          body={sampleLatestReview.body} description={sampleLatestReview.description} id={sampleLatestReview.id}
          review_username={sampleLatestReview.review_username} rating={sampleLatestReview.rating} title={sampleLatestReview.title} />}<br />

        {samplePopularReview && data[currCarouselIndex][0] === 'popular' && <PopularReviewsCard popularReviewSample={samplePopularReview} ></PopularReviewsCard>}<br />
        {samplePopularReview && data[currCarouselIndex][0] === 'popular' &&
          <CarouselReviewPreviewCard album_art={samplePopularReview.album_art}
            album_artist={samplePopularReview.album_artist} album_name={samplePopularReview.album_name}
            body={samplePopularReview.body} description={samplePopularReview.description} id={samplePopularReview.id}
            review_username={samplePopularReview.review_username} rating={samplePopularReview.rating}
            title={samplePopularReview.title} />
        }<br />

        {featuredArtist && data[currCarouselIndex][0] === 'feature' && <FeaturedArtistCard artist={featuredArtist}></FeaturedArtistCard>}
        {featuredArtist && data[currCarouselIndex][0] === 'feature' &&
          <img src={featuredArtist.image} className='carousel-featured-artist-img'></img>}
        {featuredReviewer && data[currCarouselIndex][0] === 'reviewer' && <FeaturedReviewerCard reviewer={featuredReviewer}></FeaturedReviewerCard>}
        {featuredReviewer && data[currCarouselIndex][0] === 'reviewer' && <img src={featuredReviewer.avatar} className='carousel-featured-artist-img'></img>}
        <button className="carousel-arrow-r" onClick={decrement}>&lt;</button>
        <button className="carousel-arrow-l" onClick={increment}>&gt;</button>
      </div>
      {/* <h3>OR WRITE YOUR OWN</h3> */}
      {/* <ReviewSearchAndSelect/> */}
    </div>
  );
}

export default Home;