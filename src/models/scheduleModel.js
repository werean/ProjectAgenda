const { scheduleSchema } = require("./mongoSchemaModel");
const validator = require("validator");

function Schedule(body) {
  // aqui instanciei a classe
  this.body = body;
  this.schedule = null;
  this.errors = [];
}
Schedule.findById = async function (id) {
  // Aqui estou declarando um método estático. Isso significa que eu posso chamar este método diretamente na classe Schedule, sem precisar instanciá-la (por exemplo, não preciso usar const schedule = new Schedule()). Posso usá-lo diretamente através da classe após importá-la.
  if (typeof id !== "string") return;
  const schedule = await scheduleSchema.findById(id); // aqui estou declarando a variavel que irá receber os valores do schema do schedule
  console.log(schedule); //log nos valores
  return schedule; // retorna todos os valores do schema
  //esse metodo será utilizado no scheduleController
};

Schedule.prototype.scheduleCreate = async function () {

  //tudo que é instanciado associando a classe ao prototype fica armazenado dentro do prototype dessa classe, sendo assim possivel reutilizar todos os metodos da classe sempre que eu criar uma nova instancia dela.
  this.validity();
  if (this.errors.length > 0) return;
  //this.formatDate()
  this.schedule = await scheduleSchema.create(this.body);
};
 Schedule.prototype.formatDate = function() {
   let formatDate = this.body.date.split('-')
   console.log(formatDate)
   return this.body.date = `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`
 }
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
  this.schedule = await scheduleSchema.findByIdAndUpdate(id, this.body, { new: true }); // o metodo findByIdAndUpdate recebe o id que será editado e  o corpo da requisição e a opção new:true faz com que retorne o documento atualizado ao inves do antigo.
};

Schedule.getSchedules = async function () {
  const schedule = await scheduleSchema.find().sort({ created: -1 }); //Método find(): O método padrão do Mongoose para buscar documentos é find(), que retorna todos os documentos que correspondem ao critério especificado. Se você não especificar um critério, ele retornará todos os documentos. e o created: -1 serve para filtrar em ordem crescente(1) e decrescente(-1)
  return schedule;
};
Schedule.delete = async function (id) {
  if (typeof id !== "string") return;
  const deleteSchedule = scheduleSchema.findByIdAndDelete(id);
  return deleteSchedule;
};

module.exports = Schedule;
