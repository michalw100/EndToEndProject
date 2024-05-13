const express = require("express");
const router = express.Router();
const { create, getAll, getById, deleteById, update, getByUserID } = require('../controllers/todosController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        const userID = req.query.userID;
        res.status(200).send(await getByUserID(userID));    
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.userId;
        const todo = await getById(id);
        res.status(200).send(todo);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await create(req.body.title, req.body.completed, req.body.userID)
        res.status(200).send(await getById(response.insertId));
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const response = await update(id, req.body.title, req.body.completed, req.body.userID)
        res.status(200).send(await getById(id));    
    }
    catch(err)
    {
        res.status(500).send({message: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const response = await deleteById(id);
        res.status(200).send();    
    }
    catch(err)
    {
        res.status(500).send({message: err.message});
    }
});

module.exports = router;