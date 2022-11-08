import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import '../css/indivReview.css';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";


function ReviewComments({ reviewId, comments, setReviewComments }) {

  let currUser = useSelector(store => store.currUser);
  let [commentFormData, setCommentFormData] = useState({ comment: '' });
  console.log(currUser)


  function handleChange(evt) {
    const { name, value } = evt.target
    setCommentFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  async function handleCommentSubmit(evt) {
    evt.preventDefault();
    let res = await axios.post(`${BASE_URL}/reviews/comments/${reviewId}`, { comment: commentFormData.comment })
    setReviewComments([...comments, res.data[0]]);
    setCommentFormData({ comment: '' })
  }

  async function handleCommentDelete(evt) {
    evt.preventDefault();
    let id = evt.target.id;
    let res = await axios.post(`${BASE_URL}/reviews/comments/comment/${id}`);

    setReviewComments(comments.filter(c => c.comment_id !== +id))
  }



  return (
    <div className="comments">
      {comments && comments.map((comment) => (<div className='indiv-comment-div'>
        <Link to={`/users/${comment.comment_username}`}><span className='comment-username'>@{comment.comment_username}</span></Link> <span className='actual-comment-span'>{comment.comment}
          {currUser && currUser.isUser === comment.comment_username && <button className='delete-comment-button' onClick={handleCommentDelete}
            id={comment.comment_id}>X</button>}</span></div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input onChange={handleChange} name='comment' value={commentFormData.comment} ></input>
        <button className='add-comment-button'>Add Comment</button>
      </form>
    </div>
  );
}

export default ReviewComments;