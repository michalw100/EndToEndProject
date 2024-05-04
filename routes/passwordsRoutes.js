const express = require("express");
const router = express.Router();
const {create, getAll, getById,deleteById,update} = require('../controllers/passwordsContrller')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const todo = await getById(id);
    res.send(todo)
});

router.post("/", async(req, res) => {
    try{
        const response = await create(req.body.title, req.body.completed, req.body.userID)
        res.send(await getById(response.insertId));
    }catch(err){
        console.log("error")
      //  res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await update(id, req.body.title,req.body.completed, req.body.userID)
    res.send(await getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await deleteById(id);
    res.send();
});

module.exports = router;