const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async(req, res) => {
  try { const postID = req.query.postID;
    if(postID)
    {
        res.send(await controller.getByPostID(postID));
    }
    else
        res.send(await controller.getAll());}
    catch{
        res.status()
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await controller.getById(id);
        res.status(200).send(post)
    }
    catch (err) {
        res.status(500).send({ massege: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.postID, req.body.body, req.body.email, req.body.commentName)
        res.status(200).send(await controller.getById(response.insertId));
    } catch (err) {
        res.status(500).send({ massege: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await controller.update(id, req.body.postID, req.body.body, req.body.email, req.body.commentName)
        res.status(200).send(await controller.getById(id));
    }
    catch (err) {
        res.status(500).send({ massege: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await controller.deleteById(id);
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send({ massege: err.message });
    }
});
module.exports = router