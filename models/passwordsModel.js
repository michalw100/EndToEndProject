const pool = require('../DB.js');

async function createPassword(password) {
    try {
        const sql = "INSERT INTO passwords (password) VALUES(?)";
        const newPassword = await pool.query(sql, [SHA2(password, 256)]);
        return newPassword[0];
    } catch (err) {
        console.log(err);
    }
}

async function updatePassword(id, password) {
    try {
        const sql = `UPDATE passwords SET password WHERE passwordsID = ?`;
        const result = await pool.query(sql, [SHA2(password, 256), id]);
        console.log(result)
        return result;
    } catch (err) {
        console.error('Error updating password:', err);
        throw err;
    }
}

async function deletePassword(id) {
    try {
        const sql = `DELETE FROM passwords WHERE passwordID = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting password:', err);
        throw err;
    }
}

async function getPassword(id) {
    try {
      const sql = 'SELECT * FROM passwords where passwordID=?';
      const result = await pool.query(sql, [id]);
      return result[0][0];

    } catch (err) {
      console.log(err);
    }
}

module.exports = { createPassword, updatePassword, deletePassword, getPassword}