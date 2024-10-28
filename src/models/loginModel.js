const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { mongooseModel } = require("./mongoSchemaModel");

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async logged() {
    this.validity();
    if (this.errors.length > 0) return;
    this.user = await mongooseModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push("Usuário ou senha inválido.");
      return;
    }
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push(" Usuario ou senha inválido.");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validity();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    try {
      this.user = await mongooseModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }
  async userExists() {
    const user = await mongooseModel.findOne({ email: this.body.email });
    if (user) this.errors.push("Usuario já existe");
  }
  validity() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
    }
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
module.exports = Login;
