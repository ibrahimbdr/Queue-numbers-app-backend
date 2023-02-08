const { appointmentModel } = require('../models/appointment');
const { customerModel } = require('../models/customer');



function createAppointment(appointment) {
    
    return appointmentModel.create(appointment);
}


function updateAppointment(id, number){
    return appointmentModel.update({_id: id}, number, {runValidators: true});
}


function deleteAppointment(id){
    return appointmentModel.findByIdAndRemove(id);
}


function getAppointments() {
    return appointmentModel.find().populate("customer", "name");
}


function getAppointmentById(id) {
    return appointmentModel.find({id: id}).populate("customer","name");
}


function getUserAppointment(number) {
    const appointmentUserId = appointmentModel.find({ number: number });
    return customerModel.find({id: appointmentUserId.customer}).populate("name","name");
}



module.exports = { createAppointment, updateAppointment, deleteAppointment, getAppointmentById, getAppointments, getUserAppointment };