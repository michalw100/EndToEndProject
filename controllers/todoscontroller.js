const model = require('../models/todosModel');

async function create(title, completed, userID) {
    try {
        return await model.createTodo(title, completed, userID);
    } catch (err) {
        throw err;
    }
}

async function getByUserID(userID) {
    try {
        return await model.getTodosByUserID(userID);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await model.getTodo(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return await model.deleteTodo(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, title, completed, userID) {
    try {
        return await model.updateTodo(id, title, completed, userID);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getById, deleteById, update, getByUserID }