const { appointmentModel } = require('../models/appointment');
const { customerModel } = require('../models/customer');



function createCustomer(newCustomer) {
    
    return customerModel.create(newCustomer);
}


function updateCustomer(id, data){
    return customerModel.update({_id: id}, data, {runValidators: true});
}


function deleteCustomer(id){
    return customerModel.findByIdAndRemove(id);
}


function getCustomers() {
    return customerModel.find().populate("appointment", "number");
}


function getCustomerById(id) {
    return customerModel.find({id: id}).populate("appointment", "number");
}


function getCustomerByPhone(phone) {
    return customerModel.find({phone: phone}).populate("appointment", "number");
}

module.exports = { createCustomer, updateCustomer, deleteCustomer, getCustomers, getCustomerById, getCustomerByPhone };