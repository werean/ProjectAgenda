exports.homePage = (req, res) => {
  if (!res.locals.user) return res.redirect("/");
  return res.render("home");
};
