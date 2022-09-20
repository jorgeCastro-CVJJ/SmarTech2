// librerias base
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const csrf = require("csurf");

// uso de librerias
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// estatico, de eso no se mueve
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.render("index")
});

// cookies
app.use(
  session({
    secret: "jdfefwedewdwefsdsfsfsefewwfcvbjkygfvjm",
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
  })
);

/* evitar mal uso de ruteo
const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
});*/

// rutas a utilizar
const rutaUsuario = require("./routes/user.routes.js");
app.use("/user", rutaUsuario);

const rutasRegTarea = require("./routes/regTarea.routes");
app.use("/registrarTarea", rutasRegTarea);

// ERROR 404
app.use((request, response, next) => {
  response.status(404);
  response.send("Error 404: El recurso solicitado no existe"); //Manda la respuesta
});

app.listen(5000);
