const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const mongooseModel = mongoose.model("Registered", LoginSchema);
module.exports = mongooseModel;
