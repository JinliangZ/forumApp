const User = require("../models/user");

const Protected = async (req, res, next)=>{
    // console.log(req.userId, req.body, req.username, 'protected')
    if(!req.userId){
        return res.sendStatus(401);
    }else{
        const user = await User.findById(req.userId);
        if(!user){
            return res.sendStatus(401);
        }
        next();
    }

};

module.exports = Protected;