const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const appointmentSchema = mongoose.Schema({
  number: { type: "string", required: true, unique: true },
  status: {
    type: "string",
    enum: ["Waiting", "Finished"],
    default: "Waiting",
  },
  customer: { type: mongoose.SchemaTypes.ObjectId, ref: "Customer" },
});

appointmentSchema.plugin(timestamps);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = { appointmentModel };
