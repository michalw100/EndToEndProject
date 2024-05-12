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
       
    }
    res.send(user);
});

module.exports = router;
