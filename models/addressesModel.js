const pool = require('../DB.js');

async function createAddress( street, city, zipcode) {
    try {
        const sql = "INSERT INTO addresses (`street`, `city`, `zipcode`) VALUES(?, ?, ?)";
        const newAddress = await pool.query(sql, [street, city, zipcode]);
        return newAddress[0];
    } catch (err) {
        console.log(err);
    }
}

async function updateAddress(id, street, city, zipcode) {
    try {
        const sql = `UPDATE addresses SET street = ?, city = ?, zipcode = ? WHERE addressID = ?`;
        const result = await pool.query(sql, [street, city, zipcode, id]);
        console.log(result)
        return result;
    } catch (err) {
        console.error('Error updating address:', err);
        throw err;
    }
}

async function deleteAddress(id) {
    try {
        const sql = `DELETE FROM addresses WHERE addressID = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting address:', err);
        throw err;
    }
}

module.exports = { createAddress, updateAddress, deleteAddress }