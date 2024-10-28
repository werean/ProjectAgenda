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
  if (!req.session.user) {
    req.flash("errors", "Você precisa fazer login.");
    req.session.save(() => res.redirect("/"));
    return;
  }
  next();
};
