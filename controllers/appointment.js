const { appointmentModel } = require("../models/appointment");
const { customerModel } = require("../models/customer");

function createAppointment(appointment) {
  return appointmentModel.create(appointment);
}

function updateAppointment(id, number) {
  return appointmentModel.update({ _id: id }, number, { runValidators: true });
}

function deleteAppointment(id) {
  return appointmentModel.findByIdAndRemove(id);
}

function deleteAllAppointments() {
  return appointmentModel.deleteMany({});
}

function getAppointments() {
  return appointmentModel.find().populate("customer", "name");
}

function getLastAppoinment() {
  return appointmentModel.findOne({}, {}, { sort: { createdAt: -1 } });
}

function getAppointmentById(id) {
  return appointmentModel.find({ id: id }).populate("customer", "name");
}

function getUserAppointment(id) {
  return appointmentModel
    .findOne({ customer: id })
    .populate("customer", "name");
}

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  deleteAllAppointments,
  getAppointmentById,
  getAppointments,
  getLastAppoinment,
  getUserAppointment,
};
