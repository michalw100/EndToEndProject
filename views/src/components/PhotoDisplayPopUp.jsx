import { useState, useContext, useEffect } from 'react'
import "../CSS/popup.css";
const PhotoDisplayPopUp = ({ photoScreen,index, onClose, handleDeletePhoto, handleUpdatePhoto }) => {
    const [photo, setPhoto] = useState({ ...photoScreen });
    const [enableUpdate, setEnableUpdate] = useState(false);
    console.log(photo.id)
    return (

        <div className="popup">
            <h2>Photo Details</h2>
            <h3 className='bold'>Title:</h3>
            <input
                className='inputFill'
                type='text'
                value={photo.title}
                onChange={(e) => {
                    setPhoto((prevPhoto) => ({ ...prevPhoto, title: e.target.value }));
                    setEnableUpdate(true);
                }}
                placeholder='TITLE'
            />
            <h3 className='bold'> Url: </h3>
            <input
                className='inputFill'
                type='text'
                value={photo.thumbnailUrl}
                onChange={(e) => {
                    setPhoto((prevPhoto) => ({ ...prevPhoto, thumbnailUrl: e.target.value }));
                    setEnableUpdate(true);
                }}
                placeholder='THUMBNAILURL'
            />
            <br></br>
            <button onClick={() => { handleDeletePhoto(photoScreen.id); onClose() }}>Delete</button>
            {enableUpdate && <button onClick={() => { handleUpdatePhoto(photo, index); setEnableUpdate(false) }}>Update</button>}
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default PhotoDisplayPopUp