const model = require('../models/usersModel');

async function create(userName, name, email, phone, street, city, zipcode, company, password) {
    try {
        return model.createUser(userName, name, email, phone, street, city, zipcode, company, password);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getUsers();
    } catch (err) {
        throw err;
    }
}
async function getByPasswordAndUserName(password,userName) {
    try {
        return model.getUserByPasswordAndUserName(password,userName);
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

async function deleteById(id){
    try {
        return model.deleteUser(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, userName, name, email, phone, street, city, zipcode, company, password) {
    try {
        return model.updateUser(id, userName, name, email, phone, street, city, zipcode, company, password);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteById, update,getByPasswordAndUserName }