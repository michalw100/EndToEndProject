const model = require('../models/passwordsModel');

async function create(password) {
    try {
        return model.createPassword(password);
    } catch (err) {
        throw err;
    }

}

async function getById(id) {
    try {
        return model.getPassword(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return model.deletePassword(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, password) {
    try {
        return model.updatePassword(id, password);
    } catch (err) {
        throw err;
    }
}

module.exports = { create,  getById, deleteById, update }