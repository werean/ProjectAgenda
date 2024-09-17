const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const contactController = require("./src/controllers/contactController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");

route.get("/home", homeController.homePage);
route.get("/contato", contactController.contactPage);

route.get("/", loginController.loginPage);
route.post("/", loginController.login);
route.get("/logout", loginController.logout);

route.get("/register", registerController.registerPage);
route.post("/register/registered", registerController.register);
//route.post("/login/register", loginController.loginPage);

//route.get("/register", registerController.registerPage);
module.exports = route;
