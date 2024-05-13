const pool = require('../DB.js');

// async function getComments() {
//     try {
//         const sql = 'SELECT * FROM comments';
//         const [rows, fields] = await pool.query(sql);
//         return rows;
//     } catch (err) {
//         throw err;
//         }
// }


async function getCommentsByPostID(postID) {
    try {
        const sql = 'SELECT * FROM comments WHERE postID=?';
        const [rows, fields] = await pool.query(sql, [postID]);
        return rows;
    } catch (err) {
        throw err;
    }

}

async function getComment(id) {
    try {
        const sql = 'SELECT * FROM comments where commentID=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];
    } catch (err) {
        throw err;
    }
}

async function createComment(postID, body, email, commentName) {
    try {
        const sql = "INSERT INTO comments (`postID`,`body`,`email`,`commentName`) VALUES(?, ?,?,?)";
        const result = await pool.query(sql, [postID, body, email, commentName]);

        return result[0];

    } catch (err) {
        throw err;
    }
}

async function deleteComment(id) {
    try {
        const sql = `DELETE FROM comments WHERE commentID = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        throw err;
    }
}
async function deleteCommentsByPostId(postId) {
    try {
        const sql = `DELETE FROM comments WHERE postID = ?`;
        const result = await pool.query(sql, [postId]);
    } catch (err) {
        throw err;
    }
}
async function updateComment(id, postID, body, email, commentName) {
    try {
        const sql = `UPDATE comments SET postID = ?, body = ?,email = ?, commentName=? WHERE commentID = ?`;
        const result = await pool.query(sql, [postID, body, email, commentName, id]);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { updateComment, getComment, deleteComment, createComment, deleteCommentsByPostId, getCommentsByPostID }
