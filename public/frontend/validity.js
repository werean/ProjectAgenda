export class FormValidity {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  verify() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const element = e.target;
    const email = element.querySelector('input[name="email"]');
    const password = element.querySelector('input[name="password"]');
    let div = document.querySelector("error-msg");
    let emailError = document.createElement("div");
    emailError.textContent = "Insira um email valido";
    let error = false;

    // Verifique se o email é válido
    if (!email) {
      div.appendChild(emailError);
      alert("Email inválido.");

      error = true;
    }

    // Verifique o comprimento da senha
    if (password.value.length < 3 || password.value.length > 50) {
      alert("Senha precisa ter entre 3 e 50 caracteres");
      error = true;
    }

    // Se não houver erro, envie o formulário
    if (!error) {
      element.submit();
    }
  }
}

// Altere o seletor para o formulário que contém ambos os campos
