import { useState, useContext, useEffect } from 'react'
import "../CSS/list.css";
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
const AlbumAtScreen = ({ albumScreen, handleDeleteAlbum, handleUpdateAlbum, index }) => {
    const [album, setAlbum] = useState({ ...albumScreen });
    const [enableUpdate, setEnableUpdate] = useState(false);
    const context = useContext(UserContext);
    const { userDetails } = context;
    return (
        <div className='box'>
            <Link to={`${album.id}/photos`}>
                <h4><span className='bold'>Show Album Id: </span>{albumScreen.id}</h4>
            </Link>
            <h3><span className='bold'>Title:</span></h3>
            <input
                className='inputFill'
                type='text'
                value={album.title}
                onChange={(e) => {
                    setAlbum((prevAlbum) => ({ ...prevAlbum, title: e.target.value }));
                    setEnableUpdate(true);
                }}
            />
            <br></br>
            <button className='btnPost' onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
            {enableUpdate && <button className='btnPost' onClick={() => { handleUpdateAlbum(album, index); setEnableUpdate(false) }}>Update</button>}
        </div>
    )
}

export default AlbumAtScreen