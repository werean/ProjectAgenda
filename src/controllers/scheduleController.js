const Schedule = require("../models/scheduleModel");

exports.schedulePage = (req, res) => {
  return res.render("schedule");
};
exports.schedule = async function (req, res) {
  try {
    const schedule = new Schedule(req.body);
    await schedule.scheduleCreate();
    if (schedule.errors.length > 0) {
      req.flash("errors", schedule.errors);
      req.session.save(function () {
        return console.log(schedule.errors), res.redirect("/contato");
      });
      return;
    }
    req.flash("success", "Agendamento realizado!");
    req.session.save(function () {
      res.redirect(`/agendamento/edit/${schedule.user._id}`);
      return;
    });
  } catch (e) {
    console.log(e);
    res.render("error");
  }
};
exports.editSchedule = async function (req, res) {
  if (!req.params.id) return res.render("error");
  const user = await Schedule.findById(req.params.id);
  if (!user) return res.render("error");
  res.render("schedule", {
    user,
  });
};
