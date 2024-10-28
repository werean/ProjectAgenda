const Schedule = require("../models/scheduleModel");

exports.schedulePage = (req, res) => {
  return res.render("schedule", {
    schedule: null,
  });
};
exports.createSchedule = async function (req, res) {
  try {
    const schedule = new Schedule(req.body);

    await schedule.scheduleCreate();

    if (schedule.errors.length > 0) {
      req.flash("errors", schedule.errors);
      req.session.save(function () {
        return console.log(schedule.errors), res.redirect("/agendamento");
      });
      return;
    }
    req.flash("success", "Agendamento realizado!");
    req.session.save(function () {
      res.redirect("/home");
      return;
    });
  } catch (e) {
    console.log(e);
    res.render("error");
  }
};
exports.getScheduleToEdit = async function (req, res) {
  if (!req.params.id) return res.render("error");
  const schedule = await Schedule.findById(req.params.id);
  console.log(req.params.id);

  if (!schedule) return res.render("error");

  res.render("schedule", {
    schedule,
    formatDate: Schedule.prototype.formatDate,
  });
};

exports.editSchedule = async function (req, res) {
  try {
    if (!req.params.id) return res.render("erro");
    const schedule = new Schedule(req.body);
    await schedule.edit(req.params.id);
    if (schedule.errors.length > 0) {
      req.flash("errors", schedule.errors);
      req.session.save(function () {
        return console.log(schedule.errors), res.redirect("/agendamento");
      });
      return;
    }
    req.flash("success", "Agendamento editado com sucesso!");
    req.session.save(function () {
      res.redirect(`/agendamento/edit/${req.params.id}`);
      return;
    });
  } catch (e) {
    console.log(e);
    res.render("error");
  }
};
exports.deleteSchedule = async function (req, res) {
  if (!req.params.id) return res.render("error");
  const schedule = await Schedule.delete(req.params.id);
  if (!schedule) return res.render("error");
  req.flash("success", "Agendamento deletado com sucesso!");
  req.session.save(() => res.redirect("/"));
};
