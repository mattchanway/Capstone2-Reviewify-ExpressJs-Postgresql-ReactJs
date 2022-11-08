import '../css/App.css';
import '../css/UserProfile.css';
import generic_avatar from '../assets/generic-avatar.png'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import ReviewPreviewCard from './ReviewPreviewCard';
import Star from './Star';
import BioAvatarForm from './BioAvatarForm';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function UserProfile() {

  let { userHandle } = useParams();
  let currUser = useSelector(store => store.currUser);
  let [userDetails, setUserDetails] = useState({});
  let [userReviews, setUserReviews] = useState([]);
  let [loggedInUserExistingVotes, setLoggedInUserExistingVotes] = useState({});




  useEffect(() => {
    async function getUser(userHandle) {

      let res = await axios.get(`${BASE_URL}/users/${userHandle}`);
      if (userHandle !== currUser.isUser) {
        let votes = await axios.get(`${BASE_URL}/users/${currUser.isUser}/votes`);

        setLoggedInUserExistingVotes(votes.data);
      }

      let row1 = res.data[0]
      let { bio, avatar, stars, username } = row1
      setUserDetails({ bio, avatar, stars, username });
      if ('album_id' in row1) setUserReviews(res.data);

    }
    getUser(userHandle);
  }, [userHandle])

  console.log(loggedInUserExistingVotes);
  async function addStar() {

    let result = await axios.post(`${BASE_URL}/users/${userDetails.username}/add-star`,
      { userVoting: currUser.isUser })
    let row1 = result.data[0];
    let { bio, avatar, stars, username } = row1;
    setUserDetails({ bio, avatar, stars, username });
    let updatedVotes = loggedInUserExistingVotes[userHandle] ? { ...loggedInUserExistingVotes, [userHandle]: 0 } : { ...loggedInUserExistingVotes, [userHandle]: 1 };
    setLoggedInUserExistingVotes(updatedVotes)
  }

  async function removeStar() {
    let result = await axios.post(`${BASE_URL}/users/${userDetails.username}/remove-star`, {
      userVoting: currUser.isUser
    }
    )
    let row1 = result.data[0];
    console.log('remove star post return', row1)
    let { bio, avatar, stars, username } = row1;
    setUserDetails({ bio, avatar, stars, username });
    let updatedVotes = loggedInUserExistingVotes[userHandle] ? { ...loggedInUserExistingVotes, [userHandle]: 0 } : { ...loggedInUserExistingVotes, [userHandle]: -1 };
    setLoggedInUserExistingVotes(updatedVotes);
  }
  const [bioFormData, setBioFormData] = useState({ bio: '' });
  const [avatarFormData, setAvatarFormData] = useState({ avatar: '' });

  const handleBioChange = evt => {
    const { name, value } = evt.target;
    setBioFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }

  const handleAvatarChange = evt => {
    const { name, value } = evt.target;
    setAvatarFormData(fData => ({
      ...fData,
      [name]: value
    }))
  }

  async function handleBioSubmit(evt) {
    evt.preventDefault();
    let newBio = bioFormData.bio;
    let res = await axios.patch(`${BASE_URL}/users/${userHandle}/bio`, { newBio });
    let row1 = res.data[0]
    let { bio, avatar, stars, username } = row1;
    console.log(res.data)
    setUserDetails({ bio, avatar, stars, username })
    setBioFormData({ bio: '' });

  }

  async function handleAvatarSubmit(evt) {
    evt.preventDefault();
    let newAvatar = avatarFormData.avatar;
    let res = await axios.patch(`${BASE_URL}/users/${userHandle}/avatar`, { newAvatar });
    let row1 = res.data[0];
    let { bio, avatar, stars, username } = row1;
    setUserDetails({ bio, avatar, stars, username })
    setAvatarFormData({ avatar: '' });

  }



  if (currUser.noUser) return (
    <h1>You must be logged into view.</h1>
  )

  return (
    <div className="user-profile-container">
      <div className='user-profile-details'>
        <div className='user-profile-heading-avatar-bio'>
          <h1>{userHandle}'s Profile</h1>
          <div className='avatar-wrapper'><img className='avatar-img' src={userDetails.avatar ? userDetails.avatar : generic_avatar}></img></div><span className='star-span'>
            {currUser.isUser !== userDetails.username &&
              loggedInUserExistingVotes[userHandle] !== 1 &&
              <span className='increment-star' onClick={addStar}>+</span>}
            <Star></Star>{userDetails.stars}
            {currUser.isUser !== userDetails.username &&
              loggedInUserExistingVotes[userHandle] !== -1 &&
              <span className='increment-star' onClick={removeStar}>-</span>}</span>
          <h3>About Me</h3>
          <p>{userDetails.bio ? userDetails.bio : 'Coming soon...'}</p>
        </div>
        {userHandle === currUser.isUser && <BioAvatarForm bioFormData={bioFormData} avatarFormData={avatarFormData}
          handleAvatarChange={handleAvatarChange} handleAvatarSubmit={handleAvatarSubmit}
          handleBioChange={handleBioChange} handleBioSubmit={handleBioSubmit} userHandle={userHandle}></BioAvatarForm>}
      </div>
      <h2>{userHandle}'s Reviews</h2>
      <div className='new-reviews-full-flex'>

        {userReviews && userReviews.map((r) =>
          <ReviewPreviewCard title={r.title} album_art={r.album_art}
            album_artist={r.album_artist} id={r.id} review_username={r.username}
            body={r.body} review_date={r.review_date} rating={r.rating}
            album_name={r.album_name} />)}
        {!userReviews.length && <h2>No reviews yet</h2>}
      </div>

    </div>
  );
}

export default UserProfile;