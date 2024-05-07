const model = require('../models/todosModel');

async function create(title, completed, userID) {
    try {
        return model.createTodo(title, completed, userID);
    } catch (err) {
        throw err;
    }

}

async function getByUserID(userID) {
    try {
        return model.getTodosByUserID(userID);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getTodos();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getTodo(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return model.deleteTodo(id);
    } catch (err) {
        throw err;
    }
}

async function update(id, title, completed, userID) {
    try {
        return model.updateTodo(id, title, completed, userID);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteById, update, getByUserID }