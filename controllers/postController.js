const User = require("../models/user");
const Post = require('../models/post');


//des:get all the posts  
//method: GET
const posts_show = async(req,res)=>{
    const posts = await Post.find({}).sort({createdAt: -1});
    res.status(200).send(posts);
};

//des:mange all the posts  of a user
//method: GET
const posts_manage = async(req,res)=>{
    const response = await User.findById(req.userId);
    const user = response.username;
    const posts = await Post.find({username: user}).sort({createdAt: -1});
    res.status(200).send(posts);
};

//des:get a certain post in detail
//method: GET
const posts_detail = async(req,res)=>{
    const id =req.params.id;
    const detail = await Post.findById(id);
    res.status(200).send(detail);
};


//des: send create post form
//method: POST
const posts_create = async(req,res)=>{
    const post = await Post.create({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content
    });
    res.status(201).send({
        message: 'NEW POST IS CREATED!!!'});
};

//des: delete a certain post by a certain user
//method: DELETE
const posts_delete = async(req,res)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const response = await User.findById(req.userId);
    const user = response.username;
    const posts = await Post.find({username: user}).sort({createdAt: -1});
    res.status(200).send(posts);
};


module.exports = {posts_show, posts_manage, posts_detail, posts_create,posts_delete};
