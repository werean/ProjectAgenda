const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
exports.mongooseModel = mongoose.model("Registered", LoginSchema);

const ScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
});
exports.scheduleSchema = mongoose.model("Schedule", ScheduleSchema);
