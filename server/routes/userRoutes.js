const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

//@des get the index page
//method: GET
router.get('/index', async (req,res)=>{
    console.log('get index')
    const user= await User.findById(req.userId);
    res.send({user});
});



router.post('/signup', async (req,res)=>{
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

    
});

router.post('/login', async (req,res)=>{
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
    })
});

router.post('/change_password', async (req,res)=>{
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

});


module.exports = router;