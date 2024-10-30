const Login = require("../models/loginModel");

exports.loginPage = (req, res) => {
  return res.render("login");
};
exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.logged();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return console.log(login.errors), res.redirect("/");
      });
      return;
    }
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/home");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
