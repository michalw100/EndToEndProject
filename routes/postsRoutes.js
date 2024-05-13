const express = require("express");
const router = express.Router();
const controller = require('../controllers/postsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        const userID = req.query.userID;
        if (userID) {
            res.status(200).send(await controller.getByUserID(userID));
        }
        else
            res.status(200).send(await controller.getAll());
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await controller.getById(id);
        res.status(200).send(post)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.title, req.body.body, req.body.userID)
        res.status(200).send(await controller.getById(response.insertId));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.update(id, req.body.title, req.body.body, req.body.userID)
        res.status(200).send(await controller.getById(id));
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.update(id, req.body.title, req.body.body, req.body.userID)
        res.status(200).send(await controller.getById(id));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;