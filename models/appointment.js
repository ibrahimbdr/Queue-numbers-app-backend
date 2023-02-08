const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');

const appointmentSchema = mongoose.Schema(
    {
        number: { type: 'string', required: true, unique: true},
        customer: {type: mongoose.Schema.ObjectId, ref: 'Customer'},
    }
)

appointmentSchema.plugin(timestamps);


// customerSchema.pre("save", function (next) {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.phone, salt);
//     this.phone = hash;

//     next();
// })

const appointmentModel = mongoose.model('Appointment', appointmentSchema);
module.exports = { appointmentModel };