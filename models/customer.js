const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const customerSchema = mongoose.Schema(
    {
        name: { type: 'string', required: true, unique: true},
        phone: { type: 'string', required: true, unique: true},
        appointment: {type: mongoose.Schema.ObjectId, ref: 'Appoinment'},
        token: { type: String },
    }
)

customerSchema.plugin(timestamps);

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = { customerModel };