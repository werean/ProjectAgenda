const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { mongooseModel } = require("./mongoSchemaModel");

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registerCreate() {
    this.registerValidation();
    if (this.errors.length > 0) return;
    await this.emailExist();
    if (this.errors.length > 0) return;
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await mongooseModel.create(this.body);
  }
  async emailExist() {
    const findEmail = await mongooseModel.findOne({ email: this.body.email });
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
