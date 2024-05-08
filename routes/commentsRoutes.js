const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async(req, res) => {
    const postID = req.query.postID;
    if(postID)
    {
        res.send(await controller.getByPostID(postID));
    }
    else
        res.send(await controller.getAll());
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const post = await controller.getById(id);
    res.send(post)
});

router.post("/", async(req, res) => {
    try{
        console.log(req.body.email)
        console.log(req.body.body)
        console.log(req.body.postID)
        console.log(req.body.commentName)
        const response=await controller.create(req.body.postID, req.body.body ,req.body.email, req.body.commentName)
        res.send(await controller.getById(response.insertId));
    }catch(err){
        console.log("error"+err);
        // res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await controller.update(id, req.body.postID, req.body.body, req.body.email, req.body.commentName)
    res.send(await controller.getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response = await controller.deleteById(id);
    res.send();
});
module.exports = router