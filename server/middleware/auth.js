const jwt = require('jsonwebtoken');

const Auth = async (req, res, next)=>{
    const tokenAuth = req.headers.authorization;
    console.log(tokenAuth);
    

    try {
        if(tokenAuth){
            const token = tokenAuth.split(' ')[1];
            if (token){
                const userData = jwt.verify(token, 'app');
                req.userId = userData.userId;
                next();
            }else{
                next();
            }
        }else{
            next();
        }
       
    } catch (error) {
        req.userId = null;
        next();
    }
};

module.exports = Auth;