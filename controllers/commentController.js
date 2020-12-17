const Comment = require("../models/comment");

//des:get all the comments  
//method: GET
const comments_show = async(req,res)=>{
    const {id} = req.params;
    const response = await Comment.find({postId : id});

    res.status(200).send(response);
};


//des: send comment form
//method: POST
const comments_add = async(req,res)=>{
    //console.log(req.body)
    const comment = await Comment.create({
        value: req.body.value,
        postId : req.body.postId,
        userId : req.body.userId,
        username : req.body.username,
        comment : req.body.comment
    });

    res.status(201).send({
        message: 'NEW COMMENT IS ADDED!!!'});
};








module.exports = {comments_show,comments_add}