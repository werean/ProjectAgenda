const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const scheduleController = require("./src/controllers/scheduleController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const { loginRequired, isLogged } = require("./src/middlewares/middleware");

//outras rotas
route.get("/home", loginRequired, homeController.homePage); // aqui estou passando o middleware loginRequired antes dele mover para a rota que eu quero para que ele verifique se o usuario está logado
route.get("/agendamento", loginRequired, scheduleController.schedulePage);
route.post("/agendamento/create", loginRequired, scheduleController.createSchedule);
//edit
route.get("/agendamento/edit/:id", loginRequired, scheduleController.getScheduleToEdit);
route.post("/agendamento/edit/:id", loginRequired, scheduleController.editSchedule);
route.get("/agendamento/delete/:id", loginRequired, scheduleController.deleteSchedule);

//rota de login/logout
route.get("/", isLogged, loginController.loginPage);
route.post("/", loginController.login);
route.get("/logout", loginController.logout);

//rota de register
route.get("/register", registerController.registerPage);
route.post("/register/registered", registerController.register);

module.exports = route;
