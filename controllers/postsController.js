const model = require('../models/postsModel');

async function create(title, body, userID) {
    try {
        return model.createPost(title, body, userID);
    } catch (err) {
        throw err;
    }

}
async function getAll() {
    try {
        return model.getPosts();
    } catch (err) {
        throw err;
    }
}

async function getByUserID(userID) {
    try {
        return model.getPostsByUserID(userID);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getPost(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return model.deletePost(id);
    } catch (err) {
        throw err;
    }
}

async function update(id,title, body, userID) {
    try {
        return model.updatePost(id,title, body, userID);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteById, update, getByUserID }