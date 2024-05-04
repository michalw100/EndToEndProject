const model = require('../models/commentsModel');

async function create(postID,body,email,commentName) {
    try {
        return model.createComment(postID,body,email,commentName);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getComments();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getComment(id);
    } catch (err) {
        throw err;
    }
}
async function deleteById(id){
    try {
        return model.deleteComment(id);
    } catch (err) {
        throw err;
    }
}

async function update(id,postID,body,email,commentName) {
    try {
        return model.updateComment(id,postID,body,email,commentName);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById,deleteById,update }