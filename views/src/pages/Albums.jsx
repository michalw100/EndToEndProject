import React, { useState, useEffect, useContext } from 'react';
import '../CSS/list.css';
import { UserContext } from '../App';
import AlbumAtScreen from '../components/AlbumAtScreen';
const Albums = () => {
    const [albumsArray, setAlbumsArray] = useState([]);
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [album, setAlbum] = useState({ userId: userDetails.id, title: "" });
    const [enableAdd, setEnableAdd] = useState(false);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchID, setSearchID] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchArrayAlbums, setSearchArrayAlbums] = useState([]);
    async function getAlbums() {
        // פונקציה אסינכרונית בגלל שאני רוצה לחכות לתשובבה  מהשרת כדי להציג את המשימות
        try {
            const data = await fetch(`http://localhost:3000/albums?userId=${userDetails.id}`);
            const albums = await data.json();
            setAlbumsArray(albums);
            setSearchArrayAlbums(albums)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {// אם יש שינוי באלבומים - יציג אותם שוב
        getAlbums();
    }, [])

    const handleDeleteAlbum = (id) => {
        fetch(`http://localhost:3000/albums/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setAlbumsArray(prev => prev.filter(album => album.id != id)); // עובר על כל המערך ולפי הפילטר מחזיר מערך חדש - בלי הקומנט הנוכחי
            });
    }

    const handleUpdateAlbum = (albumUp, index) => {
        fetch(`http://localhost:3000/albums/${albumUp.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumUp),
        })
            .then(() => {
                let temp = [...albumsArray]// יצירת מערך עזר עם שינוי של האלבום המעודכן
                temp[index] = albumUp;
                setAlbumsArray(temp);
            });
    }
    const handleAddAlbum = async () => {
        try {
            const data = await fetch(`http://localhost:3000/albums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(album),
            });

            const albumJson = await data.json();
            setEnableAdd(false);
            setAlbumsArray(prevAlbumsArray => [...prevAlbumsArray, albumJson]);//שמירה מחדש של האלבומים
            setAlbum(prevAlbum => ({ ...prevAlbum, title: "" }));
        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
        if (!enableSearch)
            setSearchArrayAlbums(albumsArray);
        if (enableSearch) {
            if (searchID) {
                albumsArray.forEach((album) => { if (album.id == searchID) setSearchArrayAlbums([{ ...album }]) })
            }
            if (searchTitle)
            setSearchArrayAlbums(albumsArray.filter(album=>album.title.indexOf(searchTitle)!==-1))
                //albumsArray.forEach((album) => { if (album.title.indexof(searchTitle) !== -1) setSearchArrayAlbums([...]) })
        }

    }, [searchID, enableSearch, searchTitle]);
    return (
        <>
            <h1>All Your Albums:</h1>
            <div id="flexBtnTodo">
                <button className='btnTodo' onClick={() => { setEnableSearch(!enableSearch); setSearchArrayAlbums(albumsArray) }}>Search</button>
                <div id="boxSearch">
                    {enableSearch && <>
                        <input className='inputFill' type='number' onChange={(event) => setSearchID(event.target.value)} value={searchID} placeholder='FOR SEARCH ID' />
                        <input className='inputFill' type='text' onChange={(event) => setSearchTitle(event.target.value)} value={searchTitle} placeholder='FOR SEARCH TITLE' />
                    </>}
                </div>
                <button className='btnTodo' onClick={() => setEnableAdd((prev) => !prev)}>Add Album</button>

            </div>
            <div id="boxAdd">
                {enableAdd && <>
                    <input
                        className='inputFill'
                        type='text'
                        placeholder='Title'
                        value={album.title}
                        onChange={(e) => { setAlbum({ ...album, title: e.target.value }); }}
                    />
                    <button className='btnTodo' onClick={handleAddAlbum}>Add</button>
                    <button className='btnTodo' onClick={() => { setEnableAdd(false); setTodo({ userId: userDetails.id, title: "" }) }}>Cancele</button></>}
            </div>
            <div id="boxShow">
                {searchArrayAlbums.map((album, index) => <AlbumAtScreen key={album.id} albumScreen={album} handleDeleteAlbum={handleDeleteAlbum} handleUpdateAlbum={handleUpdateAlbum} index={index} />)}
            </div>
        </>
    )
}

export default Albums