import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from './redux/actionCreators';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ReviewSearchAndSelect from "./components/ReviewSearchAndSelect";
import Review from "./components/Review";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ArtistReviews from './components/ArtistReviews';
import ArtistIndex from './components/ArtistIndex';
import NewReviewsFull from './components/NewReviewsFull';
import PopularReviewsFull from './components/PopularReviewsFull';
import ExistingReviewSearch from './components/ExistingReviewSearch';
import UserProfile from './components/UserProfile';




function App() {
  let dispatch = useDispatch();
  let currUser = useSelector(store => store.currUser);

  useEffect(() => {

    if (currUser.noUser) dispatch(checkUser());

  }, [dispatch])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<ReviewSearchAndSelect />}>
          </Route>
          <Route path="/reviews/:reviewId" element={<Review />} />
          <Route path="/reviews/artists/:artist" element={<ArtistReviews />} />
          <Route path="/reviews/artists" element={<ArtistIndex />} />
          <Route path="/new" element={<NewReviewsFull />} />
          <Route path="/popular" element={<PopularReviewsFull />}></Route>
          <Route path="/review-search" element={<ExistingReviewSearch />}></Route>
          <Route path="/users/:userHandle" element={<UserProfile />}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
