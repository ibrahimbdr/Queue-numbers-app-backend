const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');

const customerSchema = mongoose.Schema(
    {
        name: { type: 'string', required: true, unique: true},
        phone: { type: 'string', required: true, unique: true}
    }
)

customerSchema.plugin(timestamps);

// customerSchema.pre("save", function (next) {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.phone, salt);
//     this.phone = hash;

//     next();
// })

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = { customerModel };