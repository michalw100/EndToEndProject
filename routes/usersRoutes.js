const express = require("express");
const router = express.Router();
const {  getById, update,create } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.get("/", async (req, res) => {
//     try {
//         const users = await getAll();
//         const userAddresses = await Promise.all(users.map(async (user) => {
//         const userAddress = await addressController.getById(user.addressID);
//         delete user.passwordID;
//         delete user.addressID;
//         user.address = userAddress;
//         return user;
//         }));
//         res.send(userAddresses);
//     } catch (error) {
//         console.error("Error when getting users and addresses:", error);
//         res.status(404).send("Error when getting users and addresses");
//     }
// })


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getById(id);
    console.log(user);
    delete user.passwordID;
    delete user.addressID;
    res.send(user);
})

// router.get("/:id/password", async (req, res) => {
//     const id = req.params.id;
//     const password = await paswordController.getById(id);
//     res.send(password)
// });

router.post("/", async (req, res) => {
    try {
        const response = await create(req.body.userName, null, null, null, null, null, null,null, req.body.password);
        console.log(response);
           user ={userID:response.insertId};
           res.send(user)
    } catch (err) {
        console.log("error")
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await update(id, req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company)
    res.send(await getById(id));
});

// router.delete("/:id", async (req, res) => {
//     const id = req.params.id;
//     const response = await deleteById(id);
//     res.send();
// });

module.exports = router;