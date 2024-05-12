const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function create(userName, name, email, phone, street, city, zipcode, company, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return model.createUser(userName, name, email, phone, street, city, zipcode, company, hashedPassword);
    } catch (err) {
        throw err;
    }
}

// async function getAll() {
//     try {
//         return model.getUsers();
//     } catch (err) {
//         throw err;
//     }
// }

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
        throw err;
    }
}


async function getById(id) {
    try {
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
}
async function getByUserName(username) {
    try {
        return model.getUserByUserName(username);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id) {
    try {
        return model.deleteUser(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, userName, name, email, phone, street, city, zipcode, company) {
    try {
        return model.updateUser(id, userName, name, email, phone, street, city, zipcode, company);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getById, deleteById, update, getByPasswordAndUserName, getByUserName }