const { adminModel } = require("../../models/admin");

// validating user account is an admin
async function adminRole(req, res, next) {
  console.log(req);
  const admin = await adminModel.findById(req.userId);
  if (admin != null) {
    next();
  } else {
    res.status(403).send("You must be an admin!!!");
  }
}

module.exports = { adminRole };
