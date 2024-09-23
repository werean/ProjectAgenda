const validator = require("validator"); //valida email entre outras coisas
const bcryptjs = require("bcryptjs"); // incripta a senha para nao mandar a senha real para o banco de dados
const { mongooseModel } = require("./mongoSchemaModel");

class Register {
  // aqui estou instanciando as coisas que eu vou receber
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registerCreate() {
    this.registerValidation(); //verifico se o email informado é valido
    if (this.errors.length > 0) return; // se existir erros eu paro a execução
    await this.emailExist(); //verifico no banco se o email já esta cadastrado
    if (this.errors.length > 0) return; // verifico novamente se existe erros
    const salt = bcryptjs.genSaltSync(); //instancio o bcrypt
    this.body.password = bcryptjs.hashSync(this.body.password, salt); //criptografo a senha com a instancia a cima
    this.user = await mongooseModel.create(this.body); //crio no banco o que foi informado no body
  }
  async emailExist() {
    const findEmail = await mongooseModel.findOne({ email: this.body.email }); //aqui ele procura na coleção Registered se o this.body.email que está sendo enviado já existe na coleção
    if (findEmail) this.errors.push("E-mail já cadastrado.");
  }
  registerValidation() {
    this.cleanUp();
    if (!this.body.name) {
      this.errors.push("Preencha o campo de nome.");
    }
    if (!this.body.email || !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail invalido.");
    }
    if (this.body.password.length < 3 || this.body.password.length > 100) {
      this.errors.push("A senha precisa ter entre 3 e 100 caracteres");
    }
    if (this.body.email !== this.body.confirmEmail) {
      this.errors.push("Preencha os campos de email com o mesmo email");
    }

    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push("Preencha os campos de senha com a mesma senha");
    }
  }
  cleanUp() {
    for (const key in this.body) {
      //aqui estou transformando tudo que nao for string em string para que ninguem consiga mandar qualquer comando para dentro da aplicação
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
      confirmEmail: this.body.confirmEmail,
      confirmPassword: this.body.confirmPassword,
    };
  }
}
module.exports = Register;
