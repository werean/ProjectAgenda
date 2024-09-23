const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { mongooseModel } = require("./mongoSchemaModel");

class Login {
  // aqui eu criei uma classe que irá receber o req.body que vem lá do controller do login, ele será responsavel por apenas receber o corpo da requisição.
  constructor(body) {
    // estou instanciando as coisas que irei usar
    this.body = body;
    this.errors = []; //isso aqui controla se o usuario pode ou não ser criado na base de dados
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
  //abaixo é criado um efeito em cascata que basicamente o login controller chama primeiro o register() e irá ser feito diversas "verificações"
  async register() {
    this.validity(); //Aqui estou chamando as verificações
    if (this.errors.length > 0) return;
    // se existir algum erro dentro do array ele exibe o console log e encerra a aplicação
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
    this.cleanUp(); // verifico se estou realmente recebendo uma string
    if (!validator.isEmail(this.body.email)) {
      // verifico através do validator(lib externa) se realmente é um formato valido de email que estou recebendo no que esta vindo do campo email do body
      this.errors.push("Email inválido"); // se não for um email valido, eu mando uma msg de erro para dentro do array de erros
    }
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      // aqui verifico se a senha tem o tamanho que eu quero
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres"); // aqui envio o erro para o array de erros
    }
  }
  cleanUp() {
    // Caso eu receba alguma coisa que não seja uma string eu estou transformando o valor em uma string vazia. Porém praticamente sempre vou receber uma string, nao sei se isso é realmente essencial.
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      //aqui estou pegando apenas as informações que eu quero cadastrar na base de dados, que no caso seria o password e o email e nao o csrftoken
      email: this.body.email,
      password: this.body.password,
    };
  }
}
module.exports = Login;
