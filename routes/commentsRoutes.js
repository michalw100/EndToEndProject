const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsContrller')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async(req, res) => {
    res.send(await controller.getAll());
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const post = await controller.getById(id);
    res.send(post)
});

router.post("/", async(req, res) => {
    try{
        const response=await controller.create(req.body.postID,req.body.body,req.body.email,req.body.commentName)
        res.send(await controller.getById(response.insertId));
    }catch(err){
        console.log("error"+err);
        // res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.update(id,req.body.postID,req.body.body,req.body.email,req.body.commentName)
    res.send(await controller.getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.deleteById(id);
    res.send();
});
module.exports = router