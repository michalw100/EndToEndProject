const pool = require('../DB.js');
const bcrypt = require('bcrypt');

// async function getUsers() {
//     try {
//         const sql = 'SELECT * FROM users';
//         const [rows, fields] = await pool.query(sql);
//         return rows;

//     } catch (err) {
//         console.log(err)
//     }
// }

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users LEFT JOIN addresses ON users.addressID = addresses.addressID WHERE userID = ?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}
async function getUserByUserName(userName) {
    try {
        const sql = 'SELECT * FROM users where userName=?';
        const result = await pool.query(sql, [userName]);
        console.log(result);
        return result[0];
    } catch (err) {
        throw err;
    }
}

// async function getUserByPasswordAndUserName(password,userName) {
//     try {
//         console.log(password)
//         const sql = 'SELECT * FROM users natural join passwords where userName=?';
//         const result = await pool.query(sql, [userName, password]);
//         console.log(result[0][0])
//         if(result[0][0] && bcrypt.compare(password, result[0][0].password))
//             return result[0][0];
//         return null;
//     } catch (err) {
//         console.log(err);
//     }
// }

async function getUserByPasswordAndUserName( userName) {
    try {
        const sql = 'SELECT * FROM users NATURAL JOIN passwords NATURAL JOIN addresses WHERE userName=?';
        const result = await pool.query(sql, [userName]);
       
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function createUser(userName, hashedPassword) {
    try {
        if(await getUserByUserName(userName)!==[])
            throw new Error('UserName already exist');
        const sqlPassword = "INSERT INTO passwords (password) VALUES(?)";
        const newPassword = await pool.query(sqlPassword, [hashedPassword]);
        const sql = "INSERT INTO users (`userName`, `name`,`email`, `phone`, `addressID`, `company`, `passwordID`) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const newUser = await pool.query(sql, [userName, null, null, null, null, null, newPassword[0].insertId]);
        console.log(newUser[0])

        return newUser[0];
    } catch (err) {
       throw err;
    }
}

// async function deleteUser(id) {
//     try {
//         console.log(32)
//         const user = await getUser(id);
//         const sql = `DELETE FROM users WHERE userID = ?`;
//         const result = await pool.query(sql, [id]);
//         const sqlAddress = `DELETE FROM addresses WHERE addressID = ?`;
//         const resultAddress = await pool.query(sqlAddress, [id]);
//         const sqlPassword = `DELETE FROM passwords WHERE passwordID = ?`;
//         const resultPassword = await pool.query(sqlPassword, [id]);
//         } catch (err) {
//         console.error('Error deleting user:', err);
//     }
// }

async function updateUser(id, userName, name, email, phone, street, city, zipcode, company) {
    const user = await getUser(id);

    let address=user.addressID;
let resultAddress;
    try {
        if (address === null) {
            const sqlAqddress = "INSERT INTO addresses (`street`, `city`, `zipcode`) VALUES(?, ?, ?)";
             d = await pool.query(sqlAqddress, [street, city, zipcode]);
             resultAddress=d[0].insertId;
        }
        else {
            const sqlAddress = `UPDATE addresses SET street = ?, city = ?, zipcode = ? WHERE addressID = ?`;
             resultAddress = await pool.query(sqlAddress, [street, city, zipcode, user.addressID]);
        }
        // const sqlPassword = `UPDATE passwords SET password WHERE passwordsID = ?`;
        // const resultPassword = await pool.query(sql, [SHA2(password, 256), id]);
        const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, company = ?, addressID = ?, passwordID =? WHERE userID = ?`;
        const result = await pool.query(sql, [userName, name, email, phone, company, resultAddress, user.passwordID, id]);
        return result;

    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

module.exports = { updateUser, getUser, createUser, getUserByPasswordAndUserName, getUserByUserName }