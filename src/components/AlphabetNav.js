// import './App.css';
import '../css/navbar.css';
import React, { useEffect, useState } from 'react';


function AlphabetNav({ getAlphabetReviews }) {

  return (
    <div className="alphabet-nav">
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>All</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>A</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>B</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>C</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>D</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>E</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>F</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>G</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>H</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>I</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>J</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>K</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>L</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>M</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>N</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>O</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>P</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>Q</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>R</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>S</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>T</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>U</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>V</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>W</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>X</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>Y</span>
      <span style={{ color: 'rgb(0, 0, 58)' }} onClick={getAlphabetReviews} className='alphabet-nav-span'>Z</span>
    </div>
  );
}

export default AlphabetNav;