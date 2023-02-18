const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const managerSchema = mongoose.Schema({
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  email: { type: "string", required: true },
  phone: { type: "string", required: true },
  isAdmin: { type: "boolean", default: false, enum: [false] },
});

managerSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

const managerModel = mongoose.model("Manager", managerSchema);
module.exports = { managerModel };
