import '../css/App.css';
import React, { useEffect, useState } from 'react';

function SearchResultCard({ albumName, artistName, artwork,
  selectAlbumNameForReview, artistId, albumId }) {



  return (
    <div className='search-result-card'>
      <h3>{albumName && albumName.length > 18 ? albumName.slice(0, 18) + '...' : albumName}</h3>
      <h4>{artistName}</h4>
      <div className='search-result-card-img-wrapper'>
        <img className='search-result-img' src={artwork} />
      </div>
      <br></br>

      <button className='link-btn' onClick={() => selectAlbumNameForReview({
        name: albumName, art: artwork,
        albumId: albumId, artist: artistName, artistId: artistId
      })}>Review Me</button>
    </div>
  );
}

export default SearchResultCard;