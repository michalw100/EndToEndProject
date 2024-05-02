const pool = require('../DB.js');
const {createAddress, updateAddress, deleteAddress} = require('./addressesModel.js')

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;

    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users where userID=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}

async function createUser(userName, name, email, phone, street, city, zipcode, company) {
    try {
        const newAddress = await createAddress( street, city, zipcode);
        const sql = "INSERT INTO users (`userName`, `name`,`email`, `phone`, `addressID`, `company`) VALUES(?, ?, ?, ?, ?, ?)";
        const newUser = await pool.query(sql, [userName, name, email, phone, newAddress.insertId, company]);
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
        // const address = await deleteAddress(user.addressID);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id, userName, name, email, phone, street, city, zipcode, company) {
    try {

        const user = await getUser(id);
        console.log(user)
        const address = await updateAddress(user.addressID, street, city, zipcode)
        const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, company = ?, addressID = ? WHERE userID = ?`;
        const result = await pool.query(sql, [userName, name, email, phone, company, user.addressID, id]);
        return result;

    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

module.exports = { updateUser, getUser, getUsers, deleteUser, createUser }