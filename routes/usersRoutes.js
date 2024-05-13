const express = require("express");
const router = express.Router();
const {  getById, update } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await update(id, req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company)
    res.status(200).send(await getById(id));
});

module.exports = router;