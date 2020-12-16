const express = require("express");
const router = express.Router();
const Post = require('../models/post');
const protected = require('../middleware/protected');
const User = require("../models/user");


router.get('/show_posts',async (req,res)=>{
    const posts = await Post.find({}).sort({createdAt: -1});
    res.status(200).send(posts);
    
});

router.get('/manage_posts',async (req,res)=>{
    const response = await User.findById(req.userId);
    const user = response.username;
    const posts = await Post.find({username: user}).sort({createdAt: -1});
    res.status(200).send(posts);
    
});

router.get('/posts-detail/:id', async(req,res)=>{
    const id =req.params.id;
    const detail = await Post.findById(id);
    res.status(200).send(detail);

});


router.post('/create_posts', protected, async (req,res)=>{
    const post = await Post.create({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content
    });
    res.status(201).send({
        message: 'NEW POST IS CREATED!!!'});
});



router.delete('/delete_posts/:id',protected, async(req,res)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const response = await User.findById(req.userId);
    const user = response.username;
    const posts = await Post.find({username: user}).sort({createdAt: -1});
    res.status(200).send(posts);
   
});




module.exports = router;