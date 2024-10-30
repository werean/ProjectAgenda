const Register = require("../models/registerModel");

exports.registerPage = (req, res) => {
  return res.render("register");
};
exports.register = async function (req, res) {
  try {
    const register = new Register(req.body);
    await register.registerCreate();
    if (register.errors.length > 0) {
      req.flash("errors", register.errors);
      req.session.save(function () {
        return res.redirect("/register");
      });
      return;
    }

    req.flash("success", "Seu usuário foi criado com sucesso");

    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("error");
  }
};
