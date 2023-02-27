const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

// defining the schema for setting data rules
const customerSchema = mongoose.Schema({
  name: { type: "string", required: true, unique: true },
  phone: { type: "string", required: true, unique: true },
  appointment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Appointment",
  },
  active: { type: "boolean", default: true },
  token: { type: String },
  isAdmin: { type: "boolean", default: false, enum: [false] },
});

customerSchema.plugin(timestamps);

const customerModel = mongoose.model("Customer", customerSchema);
module.exports = { customerModel };
