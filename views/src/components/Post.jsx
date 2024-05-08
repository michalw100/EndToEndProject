import { useNavigate, Outlet } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from "../App.jsx"
import "../css/Posts.css"

const Post = ({ post, setPosts, posts, postInfo, setPostInfo }) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState({ ...post });
  const [formPost, setFormPost] = useState(false);
  const [editState, setEditState] = useState(false);
  const [viewComments, setViewComment] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const deletePostClicked = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    };

    fetch(`http://localhost:3000/posts/${post.postID}`, requestOptions)
      .then(() => {
        setPosts(posts.filter(currentPost => currentPost.postID !== post.postID));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  const handleSubmit = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editPost)
    };
    fetch(`http://localhost:3000/posts/${editPost.postID}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPosts(posts.map(currentPost => post.postID == currentPost.postID ? data : currentPost));
        setFormPost(false)
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    navigate(`/home/users/${user.userID}/posts`);
  }

  const resetEdit = () => {
    navigate(`/home/users/${user.userID}/posts`);
    setEditState(false);
    setEditPost(post);
  }

  return (
    <>
      <div className='post'>
        <p onDoubleClick={() => { 
          setViewComment(false)
          setFormPost((prev) => !prev),
          setEditState(false);
          // setCommentInfo(post.postID);
          if(postInfo == post.postID)
          {
              // setPostInfo(-1);
              navigate(`/home/users/${user.userID}/posts`);
          }
          else
          {
            setPostInfo(post.postID);
            navigate(`/home/users/${user.userID}/posts/${post.postID}`);
          }
        }}>{post.postID}. {post.title}</p>
      </div>
      {formPost && postInfo == post.postID && <div className='postDetails'>
        <input className='postInput'
          name="title"
          disabled={!editState}
          value={editPost.title}
          onChange={handleChange} />
        <textarea className='postInput'
          name="body"
          disabled={!editState}
          value={editPost.body}
          onChange={handleChange}
          rows={6}
          cols={50}
        />
        <hr />
        {(user.userID == post.userID) && !editState && postInfo == post.postID && <button className="btn" onClick={() => setEditState(true)}>Edit</button>}
        {editState && <><button className="btn" onClick={handleSubmit}>Save Post</button>
          <button className="btn" onClick={resetEdit}>Reset edits</button></>}
        {(user.userID == post.userID) && <button className="btn" onClick={deletePostClicked}>Delete</button>}
        <button className="btn" onClick={() => {
          navigate(`/home/users/${user.userID}/posts/${post.postID}/comments`, { state: post }),
            setViewComment((prev) => !prev)
        }}>view comments</button>
      </div>}
      {viewComments && <Outlet/>}
    </>
  );
};

export default Post;
