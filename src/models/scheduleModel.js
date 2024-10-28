const { scheduleSchema } = require("./mongoSchemaModel");
const validator = require("validator");

function Schedule(body) {
  this.body = body;
  this.schedule = null;
  this.errors = [];
}
Schedule.findById = async function (id) {
  if (typeof id !== "string") return;
  const schedule = await scheduleSchema.findById(id);
  console.log(schedule);
  return schedule;
};

Schedule.prototype.scheduleCreate = async function () {
  this.validity();
  if (this.errors.length > 0) return;
  this.schedule = await scheduleSchema.create(this.body);
};
Schedule.prototype.formatDate = function () {
  let formatDate = this.body.date.split("-");
  console.log(formatDate);
  return (this.body.date = `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`);
};
Schedule.prototype.validity = function () {
  this.cleanUp();
  if (!this.body.name || this.body.name.length < 3) {
    this.errors.push("Informe seu nome.");
  }
  if (!this.body.phone || !validator.isMobilePhone(this.body.phone)) {
    this.errors.push("Informe um número valido.");
  }
  if (!this.body.hour) {
    this.errors.push("Informe o horario que será agendado.");
  }
  if (!this.body.date) {
    this.errors.push("Informe a data do seu agendamento.");
  }
};
Schedule.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }
  this.body = {
    name: this.body.name,
    phone: this.body.phone,
    hour: this.body.hour,
    date: this.body.date,
  };
};

Schedule.prototype.edit = async function (id) {
  if (typeof id !== "string") return;
  this.validity();
  if (this.errors.length > 0) return;
  this.schedule = await scheduleSchema.findByIdAndUpdate(id, this.body, { new: true });
};

Schedule.getSchedules = async function () {
  const schedule = await scheduleSchema.find().sort({ created: -1 });
  return schedule;
};
Schedule.delete = async function (id) {
  if (typeof id !== "string") return;
  const deleteSchedule = scheduleSchema.findByIdAndDelete(id);
  return deleteSchedule;
};

module.exports = Schedule;
