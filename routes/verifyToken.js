const jwt = require("jsonwebtoken");

module.exports = function (req,res,next){
    const token = req.header('auth-token')
    console.log(req.body);
    console.log(req.headers);
    if(!token) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token,'88F47CD887DED');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}