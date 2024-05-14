const pool = require('../DB.js');

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users LEFT JOIN addresses ON users.addressID = addresses.addressID WHERE userID = ?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        throw err;
    }
}

async function getUserByPasswordAndUserName(userName) {
    try {
        const sql = 'SELECT password, zipcode, city, street, company, phone, email, name, userName, userID FROM postsdb.users NATURAL JOIN postsdb.passwords NATURAL JOIN postsdb.addresses WHERE users.userName=?';
        const result = await pool.query(sql, [userName]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function createUser(userName, hashedPassword) {
    try {
        const sqlPassword = "INSERT INTO passwords (password) VALUES(?)";
        const newPassword = await pool.query(sqlPassword, [hashedPassword]);
        const sql = "INSERT INTO users (`userName`, `name`,`email`, `phone`, `addressID`, `company`, `passwordID`) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const newUser = await pool.query(sql, [userName, null, null, null, null, null, newPassword[0].insertId]);
        return newUser[0];

    } catch (err) {
        // if (err.sqlMessage == `Duplicate entry '${userName}' for key 'users.userName'`)
        //     throw new Error('UserName already exist');
        throw err;
    }
}

async function updateUser(id, userName, name, email, phone, street, city, zipcode, company) {
    const user = await getUser(id);
    let address = user.addressID;
    let resultAddress;
    try {
        if (address === null) {
            const sqlAqddress = "INSERT INTO addresses (`street`, `city`, `zipcode`) VALUES(?, ?, ?)";
            d = await pool.query(sqlAqddress, [street, city, zipcode]);
            resultAddress = d[0].insertId;
        }
        else {
            const sqlAddress = `UPDATE addresses SET street = ?, city = ?, zipcode = ? WHERE addressID = ?`;
            resultAddress = await pool.query(sqlAddress, [street, city, zipcode, user.addressID]);
        }
        const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, company = ?, addressID = ?, passwordID =? WHERE userID = ?`;
        const result = await pool.query(sql, [userName, name, email, phone, company, resultAddress, user.passwordID, id]);
        return result;

    } catch (err) {
        throw err;
    }
}

module.exports = { updateUser, getUser, createUser, getUserByPasswordAndUserName }