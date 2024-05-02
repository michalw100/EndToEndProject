const express = require("express");
const router = express.Router();
const {create, getAll, getById,deleteById,update} = require('../controllers/usersController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async(req, res) => {
    res.send(await getAll());
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const user = await getById(id);
    res.send(user)
});

router.post("/", async(req, res) => {
    try{
        const response = await create(req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company);
        res.send(await getById(response.insertId));
    }catch(err){
        console.log("error")
      //  res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await update(id, req.body.userName, req.body.name, req.body.email, req.body.phone, req.body.street, req.body.city, req.body.zipcode, req.body.company)
    res.send(await getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await deleteById(id);
    res.send();
});

module.exports = router;