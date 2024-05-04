const express = require("express");
const router = express.Router();
const { create, getAll, getById, deleteById, update } = require('../controllers/usersController')
const addressController = require('../controllers/addressesController')
const paswordController = require('../controllers/passwordsContrller')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        const users = await getAll();
        const userAddresses = await Promise.all(users.map(async (user) => {
            const userAddress = await addressController.getById(user.addressID);
            delete user.passwordID;
            delete user.addressID;
            user.address = userAddress;
            return user;
        }));
        res.send(userAddresses);
    } catch (error) {
        console.error("שגיאה בעת קבלת משתמשים וכתובות:", error);
        res.status(500).send("שגיאה בעת טעינת המשתמשים וכתובות");
    }
});

router.get("/", async (req, res) => {
    const users = await getAll();
    for (const user of users) {
        const userAddress = await addressController.getById(user.addressID);
        delete user.passwordID;
        delete user.addressID;
        user.address = userAddress;
    }
    res.send(users);
})

router.get("/:id/password", async (req, res) => {
    const id = req.params.id;
    const password = await paswordController.getById(id);
    res.send(password)
});

router.post("/", async (req, res) => {
    try {
        const response = await create(req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company);
        res.send(await getById(response.insertId));
    } catch (err) {
        console.log("error")
        //  res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await update(id, req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company)
    res.send(await getById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteById(id);
    res.send();
});

module.exports = router;