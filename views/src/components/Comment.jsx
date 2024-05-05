import { useState, useContext } from 'react'
import { UserContext } from '../App';
import "../CSS/popup.css";

const Comment = ({ com, index, handleDeleteComment, handleUpdateComment }) => {
    const [comment, setComment] = useState({ ...com });
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [enableUpdatedCommemt, setEnableUpdatedCommemt] = useState(false);

    return (

        (com.email != userDetails.email &&
            <div className='comment' key={com.id} >
                <h5><span className='bold'>Written by: </span>{com.email}</h5>
                <h3><span className='bold'>Name: </span>{com.name}</h3>
                <p className='bodyCom'><span className='bold'>Body: </span>{com.body}</p>
            </div>)
        || (com.email == userDetails.email &&
            <div className='comment' key={com.id} >
                <h5><span className='bold'>Written by: </span>{com.email}</h5>
                <h3 className='bold'>Name:</h3>
                <input
                    className='inputFillCom'
                    type='text'
                    value={comment.name}
                    onChange={(e) => {
                        setComment((prevComment) => ({ ...prevComment, name: e.target.value }));
                        setEnableUpdatedCommemt(true);
                    }}
                />
                <h3 className='bold'>Body:</h3>
                <input
                    className='inputFillCom'
                    type='text'
                    value={comment.body}
                    onChange={(e) => {
                        setComment((prevComments) => ({ ...prevComments, body: e.target.value }));
                        setEnableUpdatedCommemt(true);
                    }}
                />
                <br></br>
                <button className="btnComment"onClick={() => handleDeleteComment(com.id)}>Delete</button>
                {enableUpdatedCommemt && <button className="btnComment" onClick={() => { handleUpdateComment(comment, index); setEnableUpdatedCommemt(false) }}>Update</button>}
            </div>)
    )
}

export default Comment