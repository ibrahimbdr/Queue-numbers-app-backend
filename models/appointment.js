const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const appointmentSchema = mongoose.Schema(
    {
        number: { type: 'string', required: true, unique: true},
        customer: {type: mongoose.Schema.ObjectId, ref: 'Customer'},
    }
)

appointmentSchema.plugin(timestamps);



const appointmentModel = mongoose.model('Appointment', appointmentSchema);
module.exports = { appointmentModel };