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
      res.redirect(`/agendamento/edit/${schedule.schedule._id}`);
      return;
    });
  } catch (e) {
    console.log(e);
    res.render("error");
  }
};
exports.getScheduleToEdit = async function (req, res) {
  if (!req.params.id) return res.render("error");
  const schedule = await Schedule.findById(req.params.id); //req.params.id é a forma do express capturar o valor dinamico que vem da url, no caso o :id ou seja, aqui eu estou capturando o valor do id da url e armazenando em uma variavel
  console.log(req.params.id);
  // Verifica se o agendamento foi encontrado; se não, renderiza a página de erro.
  if (!schedule) return res.render("error");
  // Renderiza a página de edição do agendamento, passando o objeto schedule para a view.
  res.render("schedule", {
    // e aqui eu estou passando o valor da variavel schedule para o meu arquivo ejs, para que ele consiga ter acesso aos dados
    schedule,
  });
};

exports.editSchedule = async function (req, res) {
  try {
    if (!req.params.id) return res.render("erro");
    const schedule = new Schedule(req.body);
    await schedule.edit(req.params.id); // aqui eu estou enviando o id para o scheduleModel
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
