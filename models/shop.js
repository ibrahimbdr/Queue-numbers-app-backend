const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const shopSchema = mongoose.Schema({
  shopName: { type: "string", default: "My Shop" },
  registerActive: { type: "boolean", default: true },
});

const shopModel = mongoose.model("Shop", shopSchema);
module.exports = { shopModel };
