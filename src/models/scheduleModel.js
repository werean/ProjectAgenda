const { scheduleSchema } = require("./mongoSchemaModel");
const validator = require("validator");

class Schedule {
  constructor(body) {
    this.body = body;
    this.user = null;
    this.errors = [];
  }
  async scheduleCreate() {
    this.validity();
    if (this.errors.length > 0) return;
    this.user = scheduleSchema.create(this.body);
  }
  validity() {
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
  }
  cleanUp() {
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
  }
}
module.exports = Schedule;
