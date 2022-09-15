const path = require("path");
const Usuario = require("../models/usuarioModel");

getLogin = (request, response, next) => {
  response.render(path.join("login", "login.ejs"), {
    isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
  });
};

// exports.login = (request, response, next) => {
//   if(RegNuevoProyecto in request.session.privilegios) {

//   }
// }

postLogin = (request, response, next) => {
  // recuperar usuario busco si existe
  return Usuario.fetchOne(request.body.correo) // regresa el correo del usuario
    .then(([rows, fielData]) => {
      console.log(rows[0].correo); // me da solo el correo 
      // row me da solo una consulta
      if (rows.length == 1) {
        Usuario.fetchPrivilegio(rows[0].correo) // me da una promesa
        .then(( [rows, fielData]) => { // todas las filas de los privilegios
          request.session.privilegios = []; 
          for(privilegio of rows) {
            request.session.privilegios.push(privilegio.descripcionPrivilegio); // crear un arreglo privilegios que tiene como llave el nombre del provilegio y el valor de true, con esto comparo si tiene el privilegio o no
          }
          //let listaPrivilegios = request.session.privilegios;  // <-- It's a test
          //console.log(request.session.privilegios) // me da los privilegios
          return response.redirect("/user/inicio");
           //return response.render("index.ejs", {
           //listaPrivilegios : listaPrivilegios});
        })
        .catch((err) => {
          console.log(err);
          return response.render("error.ejs");
        });
        // comparo lo que metio con la contra de la base de datos comapre me dice si son equivalentes
        /*
        bcrypt
          .compare(request.body.nombre, rows[0].nombre)
          .then((doMatch) => {
            // si coincide creo mis variables de sesion y lo dirigio a nfomes
            if (doMatch) {
              request.session.isLoggedIn = true;
              request.session.user = rows[0].nombre;
              return request.session.save((err) => {
                response.redirect("/enviar/informes");
              });
            }
            // no existe
            else console.log("El usuario no existe");
            return response.redirect("/user/login");
          })
          .catch((err) => {
            response.redirect("/user/login");
          });
        */
      } else {
        console.log("el user o contra no existe");
        return response.render("error.ejs");
      }
    })
    .catch((err) => {
      console.log(err);
      return response.render("error.ejs");
    });
};

menu = (request, response, next) => {
  console.log(request.session.privilegios);
  return response.render("index.ejs",{listaPrivilegios: request.session.privilegios});
};

module.exports = {
  getLogin,
  postLogin,
  menu,
};
// en vistas poner if pasar arreglo de privilegios a la vista e ir comparando 