import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import TodoAtScreen from '../components/TodoAtScreen';
import '../CSS/list.css'
const Todos = () => {

    const [todosArray, setTodosArray] = useState([]);
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [todo, setTodo] = useState({ userId: userDetails.id, title: "", completed: false });
    const [enableAdd, setEnableAdd] = useState(false);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchID, setSearchID] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchArrayTodos, setSearchArrayTodos] = useState([]);
    async function getTodos() {// פונקציה אסינכרונית בגלל שאני רוצה לחכות לתשובבה  מהשרת כדי להציג את המשימות
        try {
            const data = await fetch(`http://localhost:3000/todos?userId=${userDetails.id}`);
            const todos = await data.json();
            setTodosArray(todos);
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {//כל פעם שיש שינוי מציג אותו
        getTodos();
    }, [])

    useEffect(() => {
        setSearchArrayTodos(todosArray)
    }, [todosArray])//כשמחפשים המשימות יהיו מעודכנות וגם נוכל לחזור למערך הבסיסי - הוא לא יהרס

    const orderOfTodos = (event) => {//פונקציה שמפנה לפונקציות המיון
        console.log(event.target.value);
        if (event.target.value === "alphabetical") {
            orderAlf();
        }
        if (event.target.value === "execution") {
            orderEx();
        }
        if (event.target.value === "serial") {
            orderSeri();
        }
        if (event.target.value === "random") {
            orderRandom();
        }
    }

    const orderAlf = () => {
        let arrTemp = [...todosArray];
        arrTemp.sort(function (todo1, todo2) {
            return todo1.title.localeCompare(todo2.title)//מחזיר את הגדול
        })
        setTodosArray(arrTemp);
    }

    const orderEx = () => {
        let arrTemp = [];
        todosArray.forEach(todo => {
            if (todo.completed === true) {
                arrTemp.push(todo);
            }
        });
        todosArray.forEach(todo => {
            if (todo.completed === false) {
                arrTemp.push(todo);
            }
        });
        setTodosArray(arrTemp);
    }

    const orderSeri = () => {
        let arrTemp = [...todosArray];
        arrTemp.sort((todo1, todo2) => {
            return todo1.id - todo2.id;
        });
        console.log(arrTemp);
        setTodosArray(arrTemp);
    };

    const orderRandom = () => {
        console.log("hi")
        let randomNum = Math.random();
        let arrTemp = [...todosArray].sort(function (a, b) { return randomNum - Math.random(); })
        setTodosArray(arrTemp);
    }
    useEffect(() => {
        if (!enableSearch)
            setSearchArrayTodos(todosArray);
        if (enableSearch) {
            if (searchID) {
                todosArray.forEach((todo) => { if (todo.id == searchID) setSearchArrayTodos([{ ...todo }]) })
            }
            if (searchTitle)
                setSearchArrayTodos(todosArray.filter(todo => todo.title.indexOf(searchTitle) !== -1))
        }

    }, [searchID, enableSearch, searchTitle]);

    function handleSearchComplete(isComplete) {//חיפוש המשימות המושלמות או לא
        let arrTemp = [];
        todosArray.forEach(todo => {
            if (todo.completed === isComplete) {
                arrTemp.push(todo);
            }
        });
        setSearchArrayTodos(arrTemp);
    }


    async function handleAddTodo() {
        try {
            const data = await fetch(`http://localhost:3000/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            });

            const todoJson = await data.json();
            setEnableAdd(false);
            setTodosArray(prevTodosArray => [...prevTodosArray, todoJson]);// מעתיק את כל הקודמים ומוסיף את החדש
            setTodo({ userId: userDetails.id, title: "", completed: false });
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
 
    const handleDeleteTodo = (id) => {//שליחת בקשה למחיקת המשימה
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodosArray(todosArray.filter((todo) => todo.id != id))
            });
    };

    const handleUpdateTodo = (todo, index) => {//שליחת הבקשה לעדכון המשימה
        fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        })
            .then(() => {
                let temp = [...todosArray]// יצירת מערך עזר עם שינוי של האלבום המעודכן
                temp[index] = todo;
                setTodosArray(temp);
            });
        setEnableSearch(false)
    };
    
    return (
        <>
            <h1>All Your Todos:</h1>
            <div id="flexBtnTodo">
                <select className='btnTodo' name="order" id="order" onChange={orderOfTodos}>
                    <option value="serial">Serial</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="execution">Execution</option>
                    <option value="random">Random</option>
                </select>
                <button className='btnTodo' onClick={() => { setEnableSearch(!enableSearch); setSearchArrayTodos(todosArray) }}>Search</button>
                {enableSearch && <>
                    <input className='inputFill' type='number' onChange={(event) => setSearchID(event.target.value)} value={searchID} placeholder='FOR SEARCH ID' />
                    <input className='inputFill' type='text' onChange={(event) => setSearchTitle(event.target.value)} value={searchTitle} placeholder='FOR SEARCH TITLE' />
                    <button onClick={() => handleSearchComplete(true)}>COMLETE</button>
                    <button onClick={() => handleSearchComplete(false)}>UNCOMLETE</button>
                </>}
                <button className='btnTodo' onClick={() => setEnableAdd((prev) => !prev)}>Add Todo</button>
            </div>
            <div id="boxAdd">{enableAdd && <>
                <input
                    className='inputFill'
                    type='text'
                    placeholder='Title'
                    value={todo.title}
                    onChange={(e) => { setTodo({ ...todo, title: e.target.value }); }}
                />
                <input
                    className='inputFill'
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => { setTodo({ ...todo, completed: e.target.checked }); }}
                />
                <button className='btnTodo' onClick={handleAddTodo}>Add</button>
                <button className='btnTodo' onClick={() => { setEnableAdd(false); setTodo({ userId: userDetails.id, title: "", completed: false }) }}>Cancele</button></>}
            </div>
            <div id="boxShow">
                {searchArrayTodos.map((todo, index) => <TodoAtScreen key={todo.id} index={index} todo={todo} handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} />)}
            </div>
        </>
    )
}

export default Todos