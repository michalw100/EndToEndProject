import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import PostAtScreen from '../components/PostAtScreen';
import '../CSS/popup.css';
import '../CSS/list.css';
const Posts = () => {
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [post, setPost] = useState({ userId: userDetails.id, title: "", body: "" });
    const [postsArray, setPostsArray] = useState([]);
    const [allPostsArray, setAllPostsArray] = useState([]);
    const [enableAdd, setEnableAdd] = useState(false);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchID, setSearchID] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchArrayPosts, setSearchArrayPosts] = useState([]);
    async function getPosts() {// פונקציה אסינכרונית בגלל שאני רוצה לחכות לתשובבה  מהשרת כדי להציג את הפוסט
        try {
            const data = await fetch(`http://localhost:3000/posts?userId=${userDetails.id}`);
            const posts = await data.json();
            setPostsArray(posts);
            setSearchArrayPosts(posts);
            //  setSearchArrayPosts(posts)
        }
        catch (error) {
            console.log(error);
            alert(error)
            // setMessage("The Posts Aren't Found");
        }
    }
    const getAllPost = async () => {
        const data = await fetch(`http://localhost:3000/posts`);
        const posts = await data.json();
        setAllPostsArray(posts);
    }
    
    useEffect(() => {
        getPosts();
        getAllPost();
    }, [])
    async function handleAddPost() {
        try {
            const data = await fetch(`http://localhost:3000/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

            const postJson = await data.json();
            setEnableAdd(false);
            setPostsArray(prevTodosArray => [...prevTodosArray, postJson]);
            setSearchArrayPosts(prevTodosArray => [...prevTodosArray, postJson])
            setPost(prevTodo => ({ ...prevTodo, title: "" }));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    const handleUpdatePost = (updatedPost, index) => {
        fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
            .then(() => {

                let temp = [...postsArray]// יצירת מערך עזר עם שינוי של האלבום המעודכן
                temp[index] = updatedPost;
                setPostsArray(temp);
                setSearchArrayPosts(temp);
            });
    };
    
    const handleDeletePost = (id) => {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setPostsArray(postsArray.filter((post) => post.id != id))
                setSearchArrayPosts(postsArray.filter((post) => post.id != id))
            });
    };

    useEffect(() => {
        if (enableSearch) {
            let newSearchArrayPosts = [];

            if (searchID) {
                postsArray.forEach((post) => { if (post.id == searchID) newSearchArrayPosts = [{ ...post }] })
                setSearchArrayPosts(newSearchArrayPosts);
            }

            if (searchTitle) {
                const titleFilteredPosts = postsArray.filter(post => post.title.includes(searchTitle));
                newSearchArrayPosts = [...newSearchArrayPosts, ...titleFilteredPosts];
                setSearchArrayPosts(newSearchArrayPosts);
            }
        }
        else {
            setSearchArrayPosts(postsArray);
        }
    }, [searchID, enableSearch, searchTitle, postsArray, setSearchArrayPosts]);



    const handleGetAllPosts = () => {
        setSearchArrayPosts(allPostsArray);
    }
    const handleGetMyPosts = () => {
        setSearchArrayPosts(postsArray);
    }
    return (
        <>
            <h1>All Your Posts</h1>
            <button className='btnPost' onClick={() => { setEnableSearch(!enableSearch); }}>Search</button>
            <button className='btnPost' onClick={handleGetAllPosts}>All Posts</button>
            <button className='btnPost' onClick={handleGetMyPosts}>MY Posts</button>
            {enableSearch && <>
                <input type='number' onChange={(event) => setSearchID(event.target.value)} value={searchID} placeholder='FOR SEARCH ID' />
                <input type='text' onChange={(event) => setSearchTitle(event.target.value)} value={searchTitle} placeholder='FOR SEARCH TITLE' />
            </>}
            <button className='btnPost' onClick={() => setEnableAdd((prev) => !prev)}>Add Post</button>
            <div id="boxAdd">
                {enableAdd && <>
                    <input
                        className='inputFill'
                        type='text'
                        placeholder='Title'
                        value={post.title}
                        onChange={(e) => { setPost({ ...post, title: e.target.value }); }}
                    />
                    <input
                        className='inputFill'
                        type='text'
                        placeholder='Body'
                        value={post.body}
                        onChange={(e) => { setPost({ ...post, body: e.target.value }); }}
                    />

                    <button className='btnPost' onClick={handleAddPost}>Add</button>
                    <button className='btnPost' onClick={() => { setEnableAdd(false); setPost({ userId: userDetails.id, title: "", body: "" }) }}>Cancele</button></>}
            </div>
            <div id="boxShow">
                {searchArrayPosts.map((post, index) => <PostAtScreen key={index} index={index} post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} />)}
            </div>
        </>
    )
}

export default Posts