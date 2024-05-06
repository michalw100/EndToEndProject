const pool = require('../DB.js');
const bcrypt = require('bcrypt');

const {createAddress, updateAddress, deleteAddress} = require('./addressesModel.js')
const {createPassword, updatePassword, deletePassword} = require('./passwordsModel.js')

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.query(sql);
        return rows;

    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users natural join addresses where userID=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function getUserByPasswordAndUserName(password,userName) {
    try {
        const sql = 'SELECT * FROM users natural join passwords where userName=? AND password=?';
        const result = await pool.query(sql, [userName,password]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createUser(userName, name, email, phone, street, city, zipcode, company, password) {
    try {
        const sqlAqddress = "INSERT INTO addresses (`street`, `city`, `zipcode`) VALUES(?, ?, ?)";
        const newAddress = await pool.query(sqlAqddress, [street, city, zipcode]);
        const sqlPassword = "INSERT INTO passwords (password) VALUES(?)";
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newPassword = await pool.query(sqlPassword, [hashedPassword]);
        const sql = "INSERT INTO users (`userName`, `name`,`email`, `phone`, `addressID`, `company`, `passwordID`) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const newUser = await pool.query(sql, [userName, name, email, phone, newAddress[0].insertId, company, newPassword[0].insertId]);
        return newUser[0];
    } catch (err) {
        console.log(err);
    }
}


async function deleteUser(id) {
    try {
        const user = await getUser(id);
        const sql = `DELETE FROM users WHERE userID = ?`;
        const result = await pool.query(sql, [id]);
        const address =  deleteAddress(user.addressID);
        const password = await deletePassword(user.passwordID);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id, userName, name, email, phone, street, city, zipcode, company, password) {
    try {

        const user = await getUser(id);
        console.log(user)
        const address = await updateAddress(user.addressID, street, city, zipcode);
        const pass = await updatePassword(password);
        const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, company = ?, addressID = ?, passwordID =? WHERE userID = ?`;
        const result = await pool.query(sql, [userName, name, email, phone, company, user.addressID, user.passwordID, id]);
        return result;

    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

module.exports = { updateUser, getUser, getUsers, deleteUser, createUser,getUserByPasswordAndUserName }