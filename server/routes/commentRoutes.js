const express = require('express');
const router = express.Router();
const protected = require('../middleware/protected');
const Comment = require("../models/comment");


router.get('/show-comments/:id',protected, async (req,res)=>{    
    const {id} = req.params;
    const response = await Comment.find({postId : id});

    res.status(200).send(response);
});


router.post('/add-comment',protected, async (req,res)=>{
    const comment = await Comment.create({
        postId : req.body.postId,
        userId : req.body.userId,
        username : req.body.username,
        comment : req.body.comment
    });

    res.status(201).send({
        message: 'NEW COMMENT IS ADDED!!!'});
});


module.exports = router;