function validityDate() {
  const getDate = document.querySelector(".date");
  const evento = getDate.addEventListener("input", () => {
    return dateValidation(new Date(getDate.value));
  });
}
function dateValidation(date) {
  if (date.getDay() === 0) {
    date = "Segunda";
    return console.log(date);
  }
  if (date.getDay() === 1) {
    date = "Terça";
    return console.log(date);
  }
  if (date.getDay() === 2) {
    date = "Quarta";
    return console.log(date);
  }
  if (date.getDay() === 3) {
    date = "Quinta";
    return console.log(date);
  }
  if (date.getDay() === 4) {
    date = "Sexta";
    return console.log(date);
  }
  if (date.getDay() === 5) {
    date = "Sabado";
    return console.log(date);
  }
  if (date.getDay() === 6) {
    date = "Domingo";
    return console.log(date);
  }
}
validityDate();
console.log("teste");
