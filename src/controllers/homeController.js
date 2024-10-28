const Schedule = require("../models/scheduleModel");

exports.homePage = async (req, res) => {
  const schedules = await Schedule.getSchedules();
  if (!res.locals.user) return res.redirect("/");
  return res.render("home", { schedules });
};
