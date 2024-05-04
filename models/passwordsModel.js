const pool = require('../DB.js');

async function createPassword(password) {
    try {
        const sql = "INSERT INTO passwords (password) VALUES(?)";
        const newPassword = await pool.query(sql, [password]);
        return newPassword[0];
    } catch (err) {
        console.log(err);
    }
}

async function updatePassword(id, password) {
    try {
        const sql = `UPDATE passwords SET password WHERE passwordsID = ?`;
        const result = await pool.query(sql, [password, id]);
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

module.exports = { createPassword, updatePassword, deletePassword}