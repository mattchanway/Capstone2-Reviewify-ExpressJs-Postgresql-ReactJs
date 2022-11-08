// import './App.css';
import '../css/navbar.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function NotFound() {

    return (
        <div className="alphabet-nav">
            <h1>Page Not Found!</h1>
            <p>Either an error occured or you have entered an incorrect address.</p>
            <Link to="/">Return Home</Link>
        </div>
    );
}

export default NotFound;