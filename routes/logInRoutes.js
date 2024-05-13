const express = require("express");
const router = express.Router();
const { getByPasswordAndUserName } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res) => {
    try {
        const userName = req.query.username;
        const password = req.query.password;
        user = await getByPasswordAndUserName(password, userName);
        res.status(200).send(user);
    }
    catch (err) {
        if (err.message == "User does not exist, please sign up")
            res.status(400).send({ massege: "User does not exist, please sign up" });
        else
            res.status(500).send({ massege: "Fail to fetch: " + err.message });
    }
});

module.exports = router;
