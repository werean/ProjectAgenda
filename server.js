require("dotenv").config();
const express = require("express");
const path = require("path");
const route = require("./routes");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  checkCsrfError,
  csrfMiddleware,
  middlewareGlobal,
} = require("./src/middlewares/middleware");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));
app.use(helmet());

//Configuração de sessão(necessário para o CSRF)
const sessionOptions = session({
  secret: "este é meu secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

//Configuração do Express
app.use(express.urlencoded({ extended: true })); // Middleware que transforma os dados de formulários enviados pelo usuário em um objeto JavaScript.
// O `extended: true` permite que o parsing de dados seja mais complexo, incluindo objetos e arrays.
app.use(express.json()); // aqui eu permito enviar e receber json

//Configuração de visualização(view engine)
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "static"));
app.use(express.static(path.resolve(__dirname, "src")));

//Middleware CSRF(deve ser depois do middleware de sessão)
app.use(csrf());

//Middleware para adicionar o token CSRF ao bojeto de resposta
app.use(csrfMiddleware);
app.use(middlewareGlobal);
//Rotas
app.use(route);

//Middleware para tratar erros CSRF(deve vir após as rotas)
app.use(checkCsrfError);

//Inicia o servidor.
app.on("pronto", () => {
  app.listen(8080, () => {
    console.log("Server running: http://localhost:8080");
  });
});
