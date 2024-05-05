import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import "../CSS/popup.css";
import Comment from './Comment';
import { useNavigate } from "react-router-dom"
const PostDisplayPopUp = ({ post, onClose, handleDeletePost, handleUpdatePost, index }) => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);
    const [enabeleAddComments, setEnabeleAddComments] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({ ...post });
    const [userComments, setUserComments] = useState([]);
    const [comment, setComment] = useState({ postId: post.id, name: "", email: userDetails.email, body: "" });

    const getComments = async () => {
        try {
            const dataCom = await fetch(`http://localhost:3000/comments?postId=${post.id}`);
            const commentsArr = await dataCom.json();
            setUserComments(commentsArr);//עדכון היוז סטייט
        } catch (error) {
            alert(error);
        }

    }

    useEffect(() => {
        getComments();
    }, []);

    const handleDeleteComment = (id) => {
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setUserComments(prev => prev.filter(com => com.id != id)); // עובר על כל המערך ולפי הפילטר מחזיר מערך חדש - בלי הקומנט הנוכחי
            });
    }

    const handleUpdateComment = (comUp, index) => {
        fetch(`http://localhost:3000/comments/${comUp.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comUp),
        })
            .then(() => {
                let temp = [...userComments]
                temp[index] = comUp;
                setUserComments(temp);
            });
    }



    async function handleAddComment() {
        try {
            const data = await fetch(`http://localhost:3000/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });

            const commentJson = await data.json();
            setEnabeleAddComments(false);
            setUserComments(prevCommentsArray => [...prevCommentsArray, commentJson]);
            setComment(({ postId: post.id, email: userDetails.email, name: "", body: "" }));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    
    return (
        <div className="popup">
            <h2>Post Details</h2>
            
            <h3> <span className='bold'>ID: </span>{post.id}</h3>
            <h3 className='bold'>Title</h3>
            {userDetails.id == post.userId &&
                <input
                    className='inputFill'
                    type='text'
                    value={updatedPost.title}
                    onChange={(e) => {
                        setUpdatedPost((prevPost) => ({ ...prevPost, title: e.target.value }));
                        setEnableUpdate(true);
                    }}
                /> || userDetails.id != post.userId && <h3>{post.title}</h3>}
            <h3 className='bold'>Body:</h3>
            {userDetails.id == post.userId &&
                <textarea
                    // className='inputFill'
                    id='bodyTextarea'
                    type='text'
                    value={updatedPost.body}
                    onChange={(e) => {
                        setUpdatedPost((prevPost) => ({ ...prevPost, body: e.target.value }));
                        setEnableUpdate(true);
                    }}
                /> || userDetails.id != post.userId && <p>{post.body}</p>}
            <div id="btnPostPop"></div>
            <button onClick={() => { onClose(); handleDeletePost(updatedPost.id) }}>Delete Post</button>
            {enableUpdate && <button onClick={() => { setEnableUpdate(false); handleUpdatePost(updatedPost, index) }}>Update</button>}
            <button onClick={() => { setDisplayComments(!displayComments); navigate(`/home/users/${userDetails.id}/posts/${post.id}/comments`) }}>Comments</button>
            <button onClick={() => setEnabeleAddComments(!enabeleAddComments)}>Add Comment</button>
            {enabeleAddComments &&// אם ההוספה מאופשרת מציג את הכפתורים ותיבות הטקסט על המסך
                <div id="inputComment">
                    <input
                        className='inputFill'
                        type='text'
                        value={comment.name}
                        onChange={(e) => {
                            setComment((prevComment) => ({ ...prevComment, name: e.target.value }));
                        }}
                        placeholder='NAME'
                    />
                    <input
                        className='inputFill'
                        type='text'
                        value={comment.body}
                        onChange={(e) => {
                            setComment((prevComment) => ({ ...prevComment, body: e.target.value }));
                        }}
                        placeholder='BODY'
                    />
                    <button onClick={handleAddComment}>OK</button>
                </div>
            }
            {displayComments &&// אם הצגת הקומנט מאופשרת - קורא לקומפוננטה
                userComments.map((com, index) => <Comment key={com.id} index={index} com={com} handleDeleteComment={handleDeleteComment} handleUpdateComment={handleUpdateComment} />)
                //שליחת הפונקציות והערכים לקומפוננטה 
            }
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PostDisplayPopUp;
