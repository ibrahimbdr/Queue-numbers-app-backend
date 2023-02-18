const { managerModel } = require("../models/manager");

function createManager(newManager) {
  return managerModel.create(newManager);
}

function updateManager(id, newManager) {
  return managerModel.update(id, newManager);
}

function getManagerById(id) {
  return managerModel.findById(id);
}

module.exports = { createManager, updateManager, getManagerById };
