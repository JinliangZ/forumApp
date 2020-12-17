const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;