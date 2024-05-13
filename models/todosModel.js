const pool = require('../DB.js');

async function getTodosByUserID(userID) {
  try {
      const sql = 'SELECT * FROM todos WHERE userID=?';
      const [rows, fields] = await pool.query(sql, [userID]);
      console.log(rows);
      return rows;
  } catch (err) {
        throw err;
  }
}
  
async function getTodo(id) {
    try {
      const sql = 'SELECT * FROM todos where todoID=?';
      const result = await pool.query(sql, [id]);
      return result[0][0];
    } catch (err) {
        throw err;
    }
}

async function createTodo(title, completed, userID) {
    try {
      const sql = "INSERT INTO todos (`userID`, `completed`, `title`) VALUES(?, ?, ?)";
      const result = await pool.query(sql,[userID, completed, title]);
      return result[0];
    } catch (err) {
        throw err;
    }
}

async function deleteTodo(id) {
    try {
      const sql = `DELETE FROM todos WHERE todoID = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
        throw err;
    }
  }
  async function updateTodo(id, title, completed, userID)  {
    try {
      const sql = `UPDATE todos SET title = ?, completed = ?, userID = ? WHERE todoID = ?`;
      const result = await pool.query(sql, [title, completed, userID, id]);
      return result;
    } catch (err) {
        throw err;
    }
  }

  module.exports = {updateTodo, getTodo, deleteTodo, createTodo, getTodosByUserID}