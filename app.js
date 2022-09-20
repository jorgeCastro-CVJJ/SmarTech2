// librerias base
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const csrf = require("csurf");

const rutaUsuario = require("./routes/user.routes.js");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// const PORT = 5000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (request, response) => {
  response.render("index")
});
// estatico, de eso no se mueve

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

app.use("/user", rutaUsuario);

const rutasRegTarea = require("./routes/regTarea.routes");
app.use("/registrarTarea", rutasRegTarea);

// ERROR 404
app.use((request, response, next) => {
  response.status(404);
  response.send("Error 404: El recurso solicitado no existe"); //Manda la respuesta
});

app.listen(5000);
