import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/Comment.css"

const Comment = ({ comment, setComments, comments}) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [editComment, setEditComment] = useState({ ...comment });
  const [editState, setEditState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditComment((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editComment)
    };
    fetch(`http://localhost:3000/comments/${editComment.commentID}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setComments(comments.map(currentComment => comment.commentID == currentComment.commentID ? data : currentComment));
        setEditState((prev) => !prev);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    navigate(`/home/users/${user.userID}/posts/${comment.postID}/comments`);
  }

  const editClicked = () => {
    setEditState((prev) => !prev);
    navigate(`/home/users/${user.userID}/posts/${comment.postID}/comments/${comment.commentID}`);
  }

  const deleteClicked = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    };

    fetch(`http://localhost:3000/comments/${comment.commentID}`, requestOptions)
      .then(() => {
        setComments(comments.filter(currentComment => currentComment.commentID !== comment.commentID));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  const resetEdit = () => {
    setEditState(false);
    setEditComment(comment);
    navigate(`/home/users/${user.userID}/posts/${comment.postID}/comments`);
  }

  return (
  //  <> {postID == comment.postID && 
    <div className='comment'>
      <p>{comment.commentID}. {comment.email}</p>
      <label>
        Comment title:
        <input className='commentInput'
          name="commentName"
          disabled={!editState}
          value={editComment.commentName}
          onChange={handleChange} />
      </label>
      <label>
        <textarea className='commentInput'
          name="body"
          disabled={!editState}
          value={editComment.body}
          onChange={handleChange}
          rows={6}
          cols={55}
        />
      </label>
      <hr />
      
      {(user.email === comment.email) &&
        <>{(!editState) && <button className="btn" onClick={editClicked}>Edit</button>}
          <button className="btn" onClick={deleteClicked}>Delete</button></>}

      {editState && <><button className="btn" onClick={handleSubmit}>Save comment</button>
        <button className="btn" onClick={resetEdit}>Reset edits</button></>}
    </div>
    // }</>
  )
}

export default Comment;