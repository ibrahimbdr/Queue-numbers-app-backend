const { adminModel } = require("../models/manager");

async function managerRole(req, res, next) {
  const manager = await adminModel.findById(req.userId);
  console.log(manager);
  if (manager != null) {
    next();
  } else {
    res.status(403).send("You must be an admin!!!");
  }
}

module.exports = { managerRole };
