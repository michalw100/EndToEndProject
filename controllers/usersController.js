const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function create(userName, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await model.createUser(userName, hashedPassword);
       return {userID:response.insertId};

    } catch (err) {
        throw err;
    }
}

async function getByPasswordAndUserName(password, userName) {
    try {
        const result = await model.getUserByPasswordAndUserName(userName);
        
        if(result[0]){
            if (bcrypt.compareSync(password, result[0].password)) {
                return result[0];
            }
        }
       
        return {};

    } catch (err) {
        throw new Error('User does not exist');
    }
}


async function getById(id) {
    try {
        return await model.getUser(id);
    } catch (err) {
        throw err;
    }
}
async function getByUserName(username) {
    try {
        return await model.getUserByUserName(username);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id) {
    try {
        return await model.deleteUser(id);
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

module.exports = { create, getById, deleteById, update, getByPasswordAndUserName, getByUserName }





// const ERROR_MESSAGES = {
//     not_Exist: 'User does not ...',

// }