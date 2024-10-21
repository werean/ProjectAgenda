exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  res.locals.path = req.path;
  res.locals.date = new Date();

  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.render("error");
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
exports.isLogged = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/home");
    return;
  }
  next();
};

exports.loginRequired = (req, res, next) => {
  // esse middleware verifica se o usuario esta logado
  if (!req.session.user) {
    //Se o usuario não tiver logado na sessão
    req.flash("errors", "Você precisa fazer login."); // ele manda uma mensagem de erro para dentro do array de erros
    req.session.save(() => res.redirect("/")); //salva essa informação disparada pelo req.flash na sessão atual, garantindo que a mensagem seja salva e esteja disponivel na proxima requisição do usuario
    return;
  }
  next();
};
