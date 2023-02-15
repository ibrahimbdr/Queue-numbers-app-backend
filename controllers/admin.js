const { adminModel } = require('../models/admin');

function createAdmin(newAdmin) {
    return adminModel.create(newAdmin);
}

function updateAdmin(id, newAdmin) {
    return adminModel.update(id, newAdmin);
}

function getAdminById(id) {
    return adminModel.findById(id);
}


module.exports = { createAdmin, updateAdmin, getAdminById };