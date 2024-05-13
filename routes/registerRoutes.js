const express = require("express");
const router = express.Router();
const { create } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res) => {
    
   try {
        const response = await create(req.body.userName, req.body.password);
        res.status(201).send(response);
   }
   catch(err)
   {
        if(err.massege == "UserName already exist")
            res.status(400).send({"massege": "UserName already exist"});
        res.status(500).send({"massege": "Fail to fetch"});
   }
});

module.exports = router;
// let user = {};
// const userName = req.query.username;
// const password = req.query.password;
// if (userName)
//     if (password) {
//         user = await getByPasswordAndUserName(password, userName);
//         if (user) {
//             delete user.addressID;
//             delete user.passwordID;
//         }
//     }

//     else {
//         user = await getByUserName(userName);
//     }
// else {
   
// }
// res.send(user);