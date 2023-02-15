const { adminModel } = require('../../models/admin') 

async function adminRole(req, res, next) {
    const admin = await adminModel.findById(req.userId);
    console.log(admin);
    if (admin != null) {
        next();
    }else{
        res.status(403).send("You must be an admin!!!");
    }   
}

module.exports = { adminRole };