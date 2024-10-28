require("dotenv").config();
const express = require("express");
const path = require("path");
const route = require("./routes");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  checkCsrfError,
  csrfMiddleware,
  middlewareGlobal,
} = require("./src/middlewares/middleware");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));
app.use(helmet());

const sessionOptions = session({
  secret: "este é meu secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "static"));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(csrf());

app.use(csrfMiddleware);
app.use(middlewareGlobal);

app.use(route);

app.use(checkCsrfError);

app.on("pronto", () => {
  app.listen(8080, () => {
    console.log("Server running: http://localhost:8080");
  });
});
