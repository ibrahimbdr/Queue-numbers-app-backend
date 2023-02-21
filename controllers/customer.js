const { appointmentModel } = require("../models/appointment");
const { customerModel } = require("../models/customer");

function createCustomer(newCustomer) {
  return customerModel.create(newCustomer);
}

function updateCustomer(id, data) {
  return customerModel.update({ _id: id }, data, { runValidators: true });
}

function deleteCustomer(id) {
  return customerModel.findByIdAndRemove(id);
}

function getCustomers() {
  return customerModel.find();
}

function getCustomerById(id) {
  return customerModel.find({ id: id });
}

function getCustomerByPhone(phone) {
  return customerModel.find({ phone: phone });
}

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
};
