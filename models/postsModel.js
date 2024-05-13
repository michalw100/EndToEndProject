const pool = require('../DB.js');
const commentsModel=require("./commentsModel.js")

async function getPosts() {
    try {
        const sql = 'SELECT * FROM posts';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        throw err;
    }

}

async function getPostsByUserID(userID) {
    try {
        const sql = 'SELECT * FROM posts WHERE userID=?';
        const [rows, fields] = await pool.query(sql, [userID]);
        console.log(rows);
        return rows;
    } catch (err) {
        throw err;
    }

}

async function getPost(id) {
    try {
        const sql = 'SELECT * FROM posts where postID=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        throw err;
    }
}

async function createPost(title,body,userID) {
    try {
        const sql = "INSERT INTO posts (`userID`,`title`, `body`) VALUES(?, ?,?)";
        const result = await pool.query(sql, [userID,title, body]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function deletePost(id) {
    try {
        commentsModel.deleteCommentsByPostId(id);
        const sql = `DELETE FROM posts WHERE postID = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        throw err;
    }
}
async function updatePost(id,title,body,userID) {
    try {
        const sql = `UPDATE posts SET title = ?, body = ?,userID = ? WHERE postID = ?`;
        const result = await pool.query(sql, [title, body, userID,id]);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { updatePost, getPost, getPosts, deletePost, createPost, getPostsByUserID }
