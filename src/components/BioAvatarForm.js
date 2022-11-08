import '../css/App.css';
import '../css/Form.css'
import React, { useEffect, useState } from 'react';

function BioAvatarForm({ userHandle, bioFormData, avatarFormData,
  handleAvatarChange, handleBioChange, handleAvatarSubmit, handleBioSubmit }) {


  return (
    <div className='bio-avatar-form'>
      <h3>Update Bio</h3>
      <form onSubmit={handleBioSubmit}>
        <textarea placeholder="New Bio" name="bio" value={bioFormData.bio} onChange={handleBioChange}></textarea><br></br>
        <button className='add-review-form-button'>Update Bio</button>
      </form>
      <h3>Update Avatar</h3>
      <p className='footnote' >*200px by 200px only</p>
      <form onSubmit={handleAvatarSubmit}>
        <input placeholder="New Avatar" name="avatar" value={avatarFormData.avatar} onChange={handleAvatarChange}></input><br></br><br></br>
        <button className='add-review-form-button'>Update Avatar</button>
      </form>

    </div>
  );
}

export default BioAvatarForm;