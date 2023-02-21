const { managerModel } = require("../models/manager");

async function managerRole(req, res, next) {
  const manager = await managerModel.findById(req.userId);
  console.log(manager);
  if (manager != null) {
    next();
  } else {
    res.status(403).send("You must be a Manager!!!");
  }
}

module.exports = { managerRole };
