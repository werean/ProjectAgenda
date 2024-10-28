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

    if (!email) {
      div.appendChild(emailError);
      alert("Email inválido.");

      error = true;
    }

    if (password.value.length < 3 || password.value.length > 50) {
      alert("Senha precisa ter entre 3 e 50 caracteres");
      error = true;
    }

    if (!error) {
      element.submit();
    }
  }
}
