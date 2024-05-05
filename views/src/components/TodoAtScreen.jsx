import React, { useState, useEffect } from 'react';
import "../CSS/list.css";
const TodoAtScreen = (props) => {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [todo, setTodo] = useState({...props.todo});

  useEffect(() => {
    setTodo(props.todo);  // Update todo state when props.todo changes
  }, [props.todo]);

  const handleCheckboxChange = (e) => {//עדכון אם המשימה הושלמה
    setEnableUpdate(true);
    setTodo((prevTodo) => ({ ...prevTodo, completed: e.target.checked }));
  };


  return (
    <div className='box'>
      <h4><span className='bold'>Id: </span>{props.todo.id}</h4>
      <h3><span className='bold'>Title:</span></h3>
      <input
        className='inputFill'
        type='text'
        value={todo.title}
        onChange={(e) => {
          setTodo((prevTodo) => ({ ...prevTodo, title: e.target.value }));//מעדכן את המשימה לקודמת בתוספת השינויים
          setEnableUpdate(true);
        }}
      />
      <input
        className='inputFill'
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
      /><br></br>
      <button className='btnTodo' onClick={()=>props.handleDeleteTodo(todo.id)}>Delete</button>
      {enableUpdate && <button className='btnTodo' onClick={()=>{props.handleUpdateTodo(todo,props.index);setEnableUpdate(false);}}>Update</button>//אם העדכון מאופשר יציג את הכפתור
      }
    </div>
  );
};

export default TodoAtScreen;
