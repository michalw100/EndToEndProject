const pool = require('../DB.js');

async function getTodos() {
    try {
      const sql = 'SELECT * FROM todos';
      const [rows, fields] = await pool.query(sql);
      console.log(rows);
      return rows;

    } catch (err) {
      console.log(err);
    }
}
  
  async function getTodo(id) {
    try {
      const sql = 'SELECT * FROM todos where todoID=?';
      const result = await pool.query(sql, [id]);
      return result[0][0];

    } catch (err) {
      console.log(err);
    }
}

async function createTodo(title, completed, userID) {
    try {
      const sql = "INSERT INTO todos (`userID`, `completed`, `title`) VALUES(?, ?, ?)";
      const result = await pool.query(sql,[userID, completed, title]);
      return result[0];

    } catch (err) {
      console.log(err);
    }
}

async function deleteTodo(id) {
    try {
      const sql = `DELETE FROM todos WHERE todoID = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  }
  async function updateTodo(id, title, completed, userID)  {
    try {
      const sql = `UPDATE todos SET title = ?, completed = ?, userID = ? WHERE todoID = ?`;
      const result = await pool.query(sql, [title, completed, userID, id]);
      return result;
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  }

  module.exports = {updateTodo, getTodo, getTodos, deleteTodo, createTodo}