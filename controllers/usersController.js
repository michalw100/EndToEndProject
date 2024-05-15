const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function create(userName, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await model.createUser(userName, hashedPassword);
        return { userID: response.insertId };

    } catch (err) {
        if (err.sqlMessage == `Duplicate entry '${userName}' for key 'users.userName'`)
            throw new Error('UserName already exist');
        throw err;
    }
}

async function getByPasswordAndUserName(password, userName) {
    try {
        result = await model.getUserByPasswordAndUserName(userName);
        if (result[0]) {
            if (bcrypt.compareSync(password, result[0].password)) {
                return result[0];
            }
            else{
                throw new Error('the password or userName is incorrect');
            }
        }
        else {
            throw new Error('User does not exist, please sign up');
        }
    } catch (err) {
        throw err;
    }
}


async function getById(id) {
    try {
        return await model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, userName, name, email, phone, street, city, zipcode, company) {
    try {
        return await model.updateUser(id, userName, name, email, phone, street, city, zipcode, company);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getById, update, getByPasswordAndUserName }
