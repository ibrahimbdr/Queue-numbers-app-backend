const { managerModel } = require("../models/manager");

function createManager(newManager) {
  return managerModel.create(newManager);
}

function updateManager(id, newManager) {
  return managerModel.update({ _id: id }, newManager, { runValidators: true });
}

function getManagerById(id) {
  return managerModel.findById(id);
}

function getManagers() {
  return managerModel.find();
}

module.exports = { createManager, updateManager, getManagerById, getManagers };
