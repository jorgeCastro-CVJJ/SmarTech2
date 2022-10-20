const path = require("path");
const Usuario = require("../models/usuarioModel");
const Proyecto = require("../models/proyectoModel");
const { response } = require("express");
const { request } = require("http");
const bcrypt = require('bcryptjs');
const Reporte = require("../models/reporteModel");

getLogin = (request, response, next) => {
  const Usuario = request.session.usuario ? request.session.usuario: '';
  response.render(path.join("login", "login.ejs"), {
    isLoggedIn: request.session,
    usuario: Usuario
  });
};

postLogin = (request, response, next) => {
  // recuperar usuario busco si existe
  return Usuario.fetchOne(request.body.correo) // regresa el correo del usuario
    .then(([rows, fielData]) => {
      // console.log(rows[0].correo); // me da solo el correo
      // console.log(rows[0].contraseña); 

      request.session.nombreSesion = rows[0].nombre;
      nombreSesion = request.session.nombreSesion;
      request.session.idSesion = rows[0].idEmpleado;
      idSesion = request.session.idSesion;
      // console.log(request.session.isLoggedIn)
      
      // row me da solo una consulta
      if (rows.length == 1) {
        console.log(request.body.contraseña, 'ex')
        console.log(rows[0].contraseña)
        bcrypt.compare(request.body.contraseña, rows[0].contraseña)
          .then(doMatch => {
            if (doMatch) {
              request.session.isLoggedIn = true;
              request.session.user = rows[0].nombre;
              request.session.save(err => {
                Usuario.fetchPrivilegio(rows[0].correo) 
                  .then(( [rows, fielData]) => {
                    request.session.privilegios = []; 
                    for(privilegio of rows) {
                      request.session.privilegios.push(privilegio.descripcionPrivilegio); // crear un arreglo privilegios que tiene como llave el nombre del provilegio y el valor de true, con esto comparo si tiene el privilegio o no
                    }
                    console.log(response.locals);
                    return response.redirect("/user/inicio")
                  })
                  .catch(err => {
                    response.render("error.ejs", {
                      isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                    })
                  })
                }) // termina .save          
            } else {
              console.log('El usuario o contraseña no existe')
              return response.redirect('/user/login')
            }
           //then doMatch 
          
          })
          .catch((err) => {
            console.log(err);
            return response.render("error.ejs");
          })
      } else {
        console.log("el user o contra no existe");
        return response.render("error.ejs");
      }
    }) //Then Usuario fetchOne
    .catch((err) => {
      console.log(err);
      return response.render("error.ejs");
    });
};

logout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect(path.join('login')); //eliminar sesión 
  });
};

menu = (request, response, next) => {
  console.log(request.session.privilegios);
  Proyecto.fetchAll()
  .then(([rowsProyecto, fielData]) => {
    Reporte.fetchHoras()
    .then(([rowsReporte, fieldData]) => {
      return response.render(path.join("index", "index.ejs"), {
      listaPrivilegios: request.session.privilegios,
      proyecto: rowsProyecto,
      reporte: rowsReporte 
      })
    });
  })
};

getCrearEmpleado = (request, response, next) => {
  let mensaje = request.session.mensaje ? request.session.mensaje : '';
  request.session.mensaje = '';
  response.render(path.join('crearEmpleado','crearEmpleado.ejs'), {
    listaPrivilegios: request.session.privilegios,
    mensaje: mensaje,
  })
};

postCrearEmpleado = (request, response, next) => {
  console.log(request.body)
  const nuevoEmpleado = new Usuario(request.body.nombre, request.body.correo, request.body.contraseña)
  console.log(nuevoEmpleado)
  nuevoEmpleado.save()
    .then(() => { //Agregar la parte de roles **
      Usuario.EmpleadoMasReciente() // <-- Me regresa el Id más nuevo
      .then(([rows,fieldData]) => {

        if (request.body.rol == 3){
          Usuario.registrarRol(3,rows[0].idEmpleado)
          Usuario.registrarRol(2,rows[0].idEmpleado)
          Usuario.registrarRol(1,rows[0].idEmpleado)
        } else if (request.body.rol == 2) {
          Usuario.registrarRol(2,rows[0].idEmpleado)
          Usuario.registrarRol(1,rows[0].idEmpleado)
        } else {
        Usuario.registrarRol(1,rows[0].idEmpleado)
        }
      }) 
      response.redirect('/user/crearEmpleado');
    })
    .catch(err => {
      console.log(err);
      response.redirect('/user/inicio')
    });
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  menu,
  getCrearEmpleado,
  postCrearEmpleado
};
// en vistas poner if pasar arreglo de privilegios a la vista e ir comparando 