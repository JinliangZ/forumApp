const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//des:go to the index page
//method: GET

const index_get = async(req,res)=>{    
        const user= await User.findById(req.userId);
        res.send({user});    
};

//des:send signup form  
//method: POST

const signup_post = async(req,res) =>{
        //check username exists
        const userExists = await User.findOne({username: req.body.username});
        if(userExists){
                res.status(400).send({
                message: 'username_exists'})
        }else{
                const newUser = await User.create({
                username: req.body.username,
                password:req.body.password,
                role: 'user'
                });
        
                res.status(201).send({
                message: 'NEW USER IS CREATED!!!'});
        };
};


//des:send login form  
//method: POST

const login_post = async(req,res) =>{
        //check username exists
        const user = await User.findOne({username: req.body.username});
        if(!user){
                res.status(400).send({
                message:' USER NOT FOUND'
                });
                return;
        };

        const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);

        if(!passwordIsEqual){
                return res.status(401).send({
                message: 'WRONG PASSWORD'
                });
                return;
        };

        const token = jwt.sign({userId: user._id}, 'app',{ expiresIn: '1h'});

        res.send({
                user,
                token
        }); 
};

//des:send change password form  
//method: POST
const password_post = async(req,res) =>{
        const user = await User.findOne({username: req.body.username});
        const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
        if(passwordIsEqual){
                return res.status(401).send({
                message: 'CAN NOT SET NEW PASSWORD AS YOUR LAST PASSWORD'
                })
        }else{
                user.password = req.body.password;
        }
        await user.save();
        res.status(201).send({
                message: 'PASSWORD CHANGED!!!'});

};

module.exports = {index_get, signup_post, login_post,password_post};
