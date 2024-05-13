const model = require('../models/postsModel');

async function create(title, body, userID) {
    try {
        return await model.createPost(title, body, userID);
    } catch (err) {
        throw err;
    }
}
async function getAll() {
    try {
        return await model.getPosts();
    } catch (err) {
        throw err;
    }
}

async function getByUserID(userID) {
    try {
        return await model.getPostsByUserID(userID);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await model.getPost(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return await model.deletePost(id);
    } catch (err) {
        throw err;
    }
}

async function update(id,title, body, userID) {
    try {
        return await model.updatePost(id,title, body, userID);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteById, update, getByUserID }