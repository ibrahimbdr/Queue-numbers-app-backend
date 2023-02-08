const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const { authorization } = req.headers;
    console.log({authorization});
    
    jwt.verify(authorization, process.env.SECRET, function (error, decoded) {
        if(decoded){
            req.customerId = decoded.data.customerId;
            console.log(decoded.data);
        }
        if(error){
            res.status(403).send('You must Log in first !!!');
            return;
            
        }
        next();
    })
}

module.exports = { auth };
