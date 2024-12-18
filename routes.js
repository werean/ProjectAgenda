const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const scheduleController = require("./src/controllers/scheduleController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const { loginRequired, isLogged } = require("./src/middlewares/middleware");

route.get("/home", loginRequired, homeController.homePage);
route.get("/agendamento", loginRequired, scheduleController.schedulePage);
route.post("/agendamento/create", loginRequired, scheduleController.createSchedule);

route.get("/agendamento/edit/:id", loginRequired, scheduleController.getScheduleToEdit);
route.post("/agendamento/edit/:id", loginRequired, scheduleController.editSchedule);
route.get("/agendamento/delete/:id", loginRequired, scheduleController.deleteSchedule);

route.get("/", isLogged, loginController.loginPage);
route.post("/", loginController.login);
route.get("/logout", loginController.logout);

route.get("/register", registerController.registerPage);
route.post("/register/registered", registerController.register);

module.exports = route;
