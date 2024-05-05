
import React, { useState, useEffect } from 'react';
import PostDisplayPopUp from './PostDisplayPopUp';
import "../CSS/list.css";

import { useNavigate } from "react-router-dom"
const PostAtScreen = (props) => {
  const [post, setPost] = useState(props.post);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {//כאשר יש שינוי הפוסט יתעדכן
    setPost(props.post);
  }, [props.post]);


  return (
    <div className='box'>
      <h4><span className='bold'>ID: </span>{post.id}</h4>
      <h3><span className='bold'>Title: </span>{post.title}</h3>
      <button className='btnPost' onClick={() => {setPopupVisible(true) ;navigate(`/home/users/${post.userId}/posts/${post.id}`)}}>Display</button>
      {isPopupVisible && (
        <PostDisplayPopUp post={post} onClose={() => setPopupVisible(false)} handleDeletePost={props.handleDeletePost} handleUpdatePost={props.handleUpdatePost}index={props.index}/>
      )}
    </div>
  );
};

export default PostAtScreen;
