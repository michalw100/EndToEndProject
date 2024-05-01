const express = require("express");
const router = express.Router();
const controller = require('../controllers/postsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));//אפשר להוריד?

router.get("/", async(req, res) => {
    res.send(await controller.getAll());
})
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const toy = await controller.deleteById(id);
    res.send(toy)
});
router.post("/", async(req, res) => {
    try{
        const response=await controller.create(req.body.title,req.body.body,req.body.usreID)
        res.send(await controller.getById(response.insertId));
    }catch(err){
        console.log("error");
        // res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
   
});
router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.update(id,req.body.title,req.body.body,req.body.usreID)
    res.send(await controller.getById(id));
});
router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.delete(id);

    res.send();
});
module.exports = router