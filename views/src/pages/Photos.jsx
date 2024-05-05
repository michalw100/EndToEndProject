import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PhotoDisplayPopUp from '../components/PhotoDisplayPopUp';
import '../CSS/list.css';
import { UserContext } from '../App';

const Photos = () => {
    const context = useContext(UserContext);
    const { userDetails } = context;
    const { albumId } = useParams();
    const [photosArray, setPhotosArray] = useState([]); // סטייט לאחסון של רשימת התמונות
    const [photo, setPhoto] = useState({ albumId: albumId, title: "", thumbnailUrl: "" });
    const [enableAdd, setEnableAdd] = useState(false);
    const [visiblePhotos, setVisiblePhotos] = useState(0); // מספר התמונות להצגה בתחילה
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const containerRef = useRef(); // Ref למרכיב המכיל את התמונות

    async function getPhotos() {
        const data = await fetch(`http://localhost:3000/albums?id=${albumId}&&userId=${userDetails.id}`)// בדיקה האם האלבום שייך אליו
        const answer = await data.json();
        if (answer[0]) {
            getPhotosFromServer();
        }
        else {
            alert("It isn't your album")
        }
    }

    // פונקציה לקריאת התמונות מהשרת 

    function getPhotosFromServer() {
        console.log(visiblePhotos)
        fetch(`http://localhost:3000/photos?albumId=${albumId}&&_start=${visiblePhotos}&_end=${visiblePhotos+8}`)
            .then(res => res.json())
            .then((data) => {
                setPhotosArray((prevPhotos) => [...prevPhotos, ...data]);
                console.log("trhjhrthrt")
                console.log(photosArray)
            })
            .catch(error => {
               alert("Error fetching photos:", error);
            });
    }
    useEffect(() => {
        getPhotos();
    }, []);
    // useEffect לקריאה ראשונית של התמונות מהשרת

    useEffect(() => {
       getPhotosFromServer();
    }, [visiblePhotos]);//כל פעם שמספר התמונות להצגה משתנה - בקשת שרת להצגת עוד תמונות
    
    const handleDeletePhoto = (id) => {
        fetch(`http://localhost:3000/photos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setPhotosArray(prevPhotos => {
                    const updatedPhotosArray = prevPhotos.filter(photo => photo.id !== id);
                    console.log(updatedPhotosArray);  // Log the updated state here or perform any other actions
                    return updatedPhotosArray;
                });
            })
            .catch(error => {
                console.error("Error deleting photo:", error);
            });
    }
    const handleUpdatePhoto = (photoUp, index) => {
        fetch(`http://localhost:3000/photos/${photoUp.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoUp),
        })
            .then(() => {
                let temp = [...photosArray]
                temp[index] = photoUp;
                console.log(temp)
                setPhotosArray(temp);
            });
    }
    const handleAddPhoto = async () => {
        try {
            const data = await fetch(`http://localhost:3000/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(photo),
            });

            const photoJson = await data.json();
            setEnableAdd(false);
            setPhotosArray(prevPhotosArray => [photoJson, ...prevPhotosArray]);
            setPhoto({ albumId: albumId, title: "", thumbnailUrl: "" })
            //setPhoto(prevTodo => ({ ...prevTodo, title: "" }));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //useEffect// לטיפול באירוע הוספת התמונה למסך
    useEffect(() => {
        // אפשרויות של Intersection Observer
        const options = {
            root: null, // הראש של המסמך (null אומר שיהיה לפי כל המסמך)
            rootMargin: '0px', // מרווח נוסף בסוף ובהתחלה של איזור הגלילה
            threshold: 0.5, // סף הגלילה, הערך 1 אומר שכשהתפקיד של הרכיב באזור הראשי הוא 100% גלילה, אפשר לשנות
        };

        // יצירת אובייקט Intersection Observer עם הגדרות
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // בדיקה האם הרכיב בתחום הראייה (Intersecting)
                if (entry.isIntersecting) {
                    DisplayMorePhotos()
                    // קריאה לפונקציה להצגת יותר תמונות
                }
            });
        }, options);

        // אם יש מסמך המכיל את הרכיב הנוכחי, התחבר לתפקיד שלו ב-Intersection Observer
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // בהרמת הרכיב, התנתק מהתפקיד של הרכיב ב-Intersection Observer
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);
    const DisplayMorePhotos=()=>{
        setVisiblePhotos(prev=>(prev+8));
    }
  // פונקציה לטיפול בלחיצה על תמונה
  const handleImageClick = (index) => {
    setSelectedPhoto(index);
};

    return (
        <div id="allPhotos">
            <button className='btnPost' onClick={() => setEnableAdd((prev) => !prev)}>Add Photo</button>
            {enableAdd && <>
                <input
                    className='inputFill'
                    type='text'
                    placeholder='Title'
                    value={photo.title}
                    onChange={(e) => { setPhoto({ ...photo, title: e.target.value }); }}
                />
                <input
                    className='inputFill'
                    type='text'
                    placeholder='THUMBNAILURL'
                    value={photo.thumbnailUrl}
                    onChange={(e) => { setPhoto({ ...photo, thumbnailUrl: e.target.value }); }}
                />

                <button onClick={handleAddPhoto}>Add</button>
                <button onClick={() => { setEnableAdd(false); setPost({ albumId: albumId, title: "", thumbnailUrl: "" }) }}>Cancele</button></>}
            <div id="getPhotos">
                {photosArray.map((photo, index) => (
                    <div key={index} className="thumbnail-container">
                        <img
                            src={photo.thumbnailUrl}
                            onClick={() => handleImageClick(index)}//כל פעם שנלחצת תמונה משנה את סלקט פוטו לאינדקס של התמונה
                            alt={photo.title}
                        />
                        <div className="thumbnail-title">{photo.title}</div>
                        {selectedPhoto === index && (
                            <PhotoDisplayPopUp
                                index={index}
                                key={photo.id}
                                photoScreen={photo}
                                handleDeletePhoto={() => handleDeletePhoto(photo.id)}
                                onClose={() => setSelectedPhoto(null)}
                                handleUpdatePhoto={handleUpdatePhoto}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div ref={containerRef} style={{ height: '2px' }} />
        </div>
    );
};

export default Photos;