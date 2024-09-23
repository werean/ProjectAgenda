const { scheduleSchema } = require("./mongoSchemaModel");
const validator = require("validator");

function Schedule(body) {
  this.body = body;
  this.user = null;
  this.errors = [];
}
Schedule.findById = async function (id) {
  if (typeof id !== "string") return;
  const user = await scheduleSchema.findById(id);
  return user;
};

Schedule.prototype.scheduleCreate = async function () {
  //tudo que é instanciado associando a classe ao prototype fica armazenado dentro do prototype dessa classe, sendo assim possivel reutilizar todos os metodos da classe sempre que eu criar uma nova instancia dela.
  this.validity();
  if (this.errors.length > 0) return;
  this.user = await scheduleSchema.create(this.body);
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
  this.user = await scheduleSchema.findByIdAndUpdate(id, this.body, { new: true });
};
module.exports = Schedule;
