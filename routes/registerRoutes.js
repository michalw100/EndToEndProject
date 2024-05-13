const express = require("express");
const router = express.Router();
const { create } = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
   try 
   {
     const response = await create(req.body.userName, req.body.password);
     res.status(201).send(response); 
   }
   catch(err)
   {
     if(err.message == "UserName already exist")
          res.status(400).send({message: "UserName already exist"});
     else
          res.status(500).send({message: "Fail to fetch: " + err.message});
   }
});

module.exports = router;