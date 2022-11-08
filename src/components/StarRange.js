import { FaStar, FaRegStar } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

function StarRange({handleStarsChange}) {
    // pass down setFormData and use the numsStarsFull
    let [numStarsFull, setNumStarsFull] = useState(1);
   
    // handleStarsChange(numStarsFull);

    function handleClick(count){
      
        setNumStarsFull(count);
        handleStarsChange(count);

    }

    function createStarRange(numStarsFull){
        let arr = [];
        let i = 1;
        while(i <=5){
            let count = i;
            if(i <= numStarsFull) arr.push(<FaStar className="star-range-icon" size="30px" color="goldenrod" onClick={()=> handleClick(count)}></FaStar>);
            if(i > numStarsFull) arr.push(<FaRegStar className="star-range-icon" size="30px" color="goldenrod" onClick={()=> handleClick(count)}></FaRegStar>);
            i++
        }
        return arr;
    }
    return(
        <div className="star-range-div">{createStarRange(numStarsFull)}</div>
    )
  }
  
  export default StarRange;