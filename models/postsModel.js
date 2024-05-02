const pool = require('../DB.js');


async function getPosts() {
    try {
        const sql = 'SELECT * FROM posts';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }

}

async function getPost(id) {
    try {
        const sql = 'SELECT * FROM posts where postID=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}



async function createPost(title,body,userID) {
    try {
        const sql = "INSERT INTO posts (`userID`,`title`, `body`) VALUES(?, ?,?)";
        const result = await pool.query(sql, [userID,title, body]);

        return result[0];

    } catch (err) {
        console.log(err);
    }
}
async function deletePost(id) {
    try {
        const sql = `DELETE FROM posts WHERE postID = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting toy:', err);
        throw err;
    }
}
async function updatePost(id,title,body,userID) {
    try {
        const sql = `UPDATE posts SET title = ?, body = ?,userID = ? WHERE postID = ?`;
        const result = await pool.query(sql, [title, body, userID,id]);
        return result;
    } catch (err) {
        console.error('Error updating post:', err);
        throw err;
    }
}

module.exports = { updatePost, getPost, getPosts, deletePost, createPost }
