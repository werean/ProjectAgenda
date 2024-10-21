function validityDate() {
  const getDate = document.querySelector(".date");
  getDate.addEventListener("input", () => {
    return console.log(getDate.value);
  });
}
validityDate();
console.log("teste");
