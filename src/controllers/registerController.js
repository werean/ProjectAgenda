const Register = require("../models/registerModel");

exports.registerPage = (req, res) => {
  return res.render("register");
};
exports.register = async function (req, res) {
  try {
    const register = new Register(req.body); // Cria uma nova instância da classe Login com os dados enviados no corpo da requisição (req.body).
    await register.registerValidity(); // Chama o método 'registerValidity' da instância de Login para validar e registrar o usuário.
    if (register.errors.length > 0) {
      // Se houver erros após a execução do método register (verifica o array de errors).
      req.flash("errors", register.errors); // Adiciona os erros à sessão do usuário usando flash messages (para mostrar mensagens temporárias).
      req.session.save(function () {
        // Salva a sessão atual e, em seguida, redireciona o usuário de volta para a página de login.
        return console.log(register.errors), res.redirect("/register");
      });
      return; // Sai da função para evitar que o fluxo continue.
    }
    // Se não houver erros, exibe uma mensagem de sucesso.
    req.flash("success", "Seu usuário foi criado com sucesso");
    // Salva a sessão atual e redireciona o usuário de volta para a página de login.
    req.session.save(function () {
      // req.session.save() serve para garantir que qualquer alteração feita na sessão do usuário seja persistida no armazenamento de sessão antes de executar o redirecionamento.
      return res.redirect("/");
    });
  } catch (e) {
    // caso tenha algum erro, exibe o erro no console e redireciona para a pagina de erro
    console.log(e);
    return res.render("404");
  }
};
