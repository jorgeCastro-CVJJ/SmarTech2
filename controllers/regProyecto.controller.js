const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Empleado = require("../models/empleadoModel");
const Trabaja = require("../models/trabajaModel");
const { error } = require("console");
const { response } = require("express");

getnuevoProyecto = (request, response, next) =>{
  console.log(request.session);
  Empleado.fetchAll()
  .then(([rowsEmpleado, fielData]) =>{
    response.render(path.join('regProyecto', 'regProyecto.ejs'), {
      empleado:rowsEmpleado,
      listaPrivilegios: request.session.privilegios,
    })
  })
  .catch((err) => {
    console.log(err);
  })
};

postnuevoProyecto = (request, response, next) => {
  const nuevoProyecto = new Proyecto(request.body.nombreP, request.body.descripcion, request.body.estatus, request.body.stackTecnologico,request.body.stakeholders);
  console.log(nuevoProyecto);
  nuevoProyecto.save()
  .then(()=> {
    //if (request.body.arrayColaboradores.length >= 1) {
      Proyecto.proyectoMasReciente()
      .then(([rows, fieldData])=>{
        Proyecto.asignarColaborador(request.session.idSesion, rows[0].idProyecto)
          .then(()=>console.log("Proyecto asignado a colaborador " + request.session.idSesion))
          .catch(err=>console.log(err));
        console.log(request.body.arrayColaboradores);
        for (colaborador of request.body.arrayColaboradores) {
          console.log(colaborador);
          let id_colaborador = colaborador;
          Proyecto.asignarColaborador(id_colaborador, rows[0].idProyecto)
            .then(()=>console.log("Proyecto asignado a colaborador " + id_colaborador))
            .catch(err=>console.log(err)); // recuperar antes el idTarea
        }
        request.session.mensaje = "Tarea creada correctamente";
        response.status(200).json({mensaje: "Listo"});
      }).catch(err => console.log(err)); 
    //} else{
    //  console.log("else del if");
    //}
  }).catch(err => console.log(err));
}

getProyectoExistente = (request, response, next) =>{
  Proyecto.fetchAll()
  .then(([rowsProyecto, fielData]) =>{
    response.render(path.join('proyectosExsistentes', 'proyectosExsistentes.ejs'), {
      proyecto:rowsProyecto,
      listaPrivilegios: request.session.privilegios,
    })
  })
  .catch((err) => {
    console.log(err);
  })
};


getProyectosByUserID = (request, response, next) => {
  let mensaje = request.session.mensaje ? request.session.mensaje : '';
  request.session.mensaje = '';
  Proyecto.fetchProyectos(request.session.idSesion)
  .then(([rowsProyecto, fielData]) => {
    Proyecto.fetchNotMyProyectos(request.session.idSesion)
    .then(([rowsTodos,fielData]) => {
      response.render(path.join('misProyectos','misProyectos.ejs'), {
        misproyectos:rowsProyecto,
        todosproyectos:rowsTodos,
        mensaje: mensaje,
        listaPrivilegios: request.session.privilegios,
    })
    console.log(rowsProyecto)
  })

    
  })
  .catch((err) => {
    console.log(err);
  })
}

getEditarProyecto = (request,response,next) => {
  Proyecto.fetchOne(request.params.idProyecto)
  .then(([rowsProyecto,fieldata]) => {
    Empleado.fetchAll()
    .then(async ([rowsEmpleado,fieldata]) => {
      response.render(path.join('editarProyecto', 'editarProyecto.ejs'), {
        proyecto: rowsProyecto,
        empleado: rowsEmpleado,
        listaPrivilegios: request.session.privilegios,
      })
    })
  })
  .catch(err => {
    console.log(err);
    response.status(500).json({message: "EROOR 500"});
  })
}

postEditarProyecto = (request, response, next) => {
  Proyecto.updateProyecto(request.params.idProyecto, 
    request.body.nombreP, request.body.descripcion, 
    request.body.estatus, request.body.stackTecnologico, 
    request.body.stakeholders)
  response.status(200).redirect('/proyecto/misProyectos')
}


getBuscar = (request, response, next) => {
  Proyecto.buscar(request.params.valor)
  .then(([rows, fielData]) => {
      response.status(200).json({proyecto: rows});
  })
  .catch(err => {
      console.log(err);
      response.status(500).json({message: "ERROR 500"});
  });
};

getProyectosExistentes = (request, response, next) => {
  Proyecto.fetchOne(request.params.idProyecto)
  .then(([rowsProyecto, fielData]) => {
    Trabaja.fetchEmpleadosProyecto(request.params.idProyecto)
    .then(([rowsTrabaja, fillData]) => {
      console.log(rowsTrabaja);
      response.render(path.join('proyectosExsistentes', 'proyectosExsistentes.ejs'), {
          proyecto: rowsProyecto,
          trabaja: rowsTrabaja,
          listaPrivilegios: request.session.privilegios,
        })
      })
    })
  .catch(err => {
    console.log(err);
  });
}

module.exports = {
  getnuevoProyecto,
  postnuevoProyecto,
  getProyectoExistente,
  getProyectosByUserID,
  getBuscar,
  getProyectosExistentes,
  getEditarProyecto,
  postEditarProyecto,
};
