// librerias base
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const csrf = require("csurf");
const morgan = require("morgan");

// uso de librerias
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// estatico, de eso no se mueve
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));



//=======================================================//
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:5000',
  clientID: 'xUtC1IKlUaHmPZn6ltl5eRKCEm6WjIpr',
  issuerBaseURL: 'https://dev-seqft5sb.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', requiresAuth(), (req, res) => {
//   res.render('index');
// });
//======================================================//

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
app.use("/user", requiresAuth(), rutaUsuario);

const rutasRegTarea = require("./routes/regTarea.routes");
app.use("/tarea", requiresAuth(), rutasRegTarea);

const rutasRegProyecto = require("./routes/regProyecto.routes");
app.use("/proyecto",requiresAuth(), rutasRegProyecto);

const rutasReporte = require("./routes/reporte.routes");
app.use("/reporte", rutasReporte);
app.get("/", requiresAuth(), (request, response) => {
  response.render("index")
});

// ERROR 404
app.use((request, response, next) => {
  response.status(404);
  response.send("Error 404: El recurso solicitado no existe"); //Manda la respuesta
});

app.listen(5000);
