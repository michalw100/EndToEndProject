const express = require("express");
const router = express.Router();
const { create, getByPasswordAndUserName, getByUserName } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res) => {
    let user = {};
    const userName = req.query.username;
    const password = req.query.password;
    if (userName)
        if (password) {
            user = await getByPasswordAndUserName(password, userName);
            if (user) {
                delete user.addressID;
                delete user.passwordID;
            }
        }

        else {
            user = await getByUserName(userName);
        }
    else {
        try {
            const response = await create(req.body.userName, null, null, null, null, null, null,null, req.body.password);
            user ={userID:response.insertId};
        } catch (err) {
            console.log("error")
            //res.sendFile(path.join(__dirname, '../public', 'error.html'));
        }
    }
    res.send(user);
});

module.exports = router;
