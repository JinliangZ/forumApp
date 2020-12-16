const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT =  process.env.PORT||5000;

const auth = require('./middleware/auth');


//load env vars
dotenv.config({path: './config/config.env'});

//create express app
const app = express();

//connect to mongoDB
connectDB().then(app.listen(PORT));


//RESTful api
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes')



//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set up middleware
app.use(cors());
app.use(morgan());
app.use(auth);

//setup react
//set static files dir
app.use(express.static(path.join(__dirname,"..","client/build")));

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);


//hanle react routing, return all requests to react app
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"..","client/build","index.html"))
})
///!!!! it is very important to have a right route order!!!


