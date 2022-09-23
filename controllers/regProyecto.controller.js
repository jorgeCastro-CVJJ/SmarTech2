const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Empleado = require("../models/empleadoModel")

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
    response.render(path.join('proyectosExistentes', 'proyectosExistentes.ejs'), {
      proyecto:rowsProyecto,
      listaPrivilegios: request.session.privilegios,
    })
  })
  .catch((err) => {
    console.log(err);
  })
};


getProyectosByUserID = (request, response, next) => {
  Proyecto.fetchProyectos(request.session.idSesion)
  .then(([rowsProyecto, fielData]) => {
    response.render(path.join('misProyectos','misProyectos.ejs'), {
      proyecto:rowsProyecto,
      listaPrivilegios: request.session.privilegios,
    })
    console.log("This is your log, george")
    console.log(rowsProyecto)
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  getnuevoProyecto,
  postnuevoProyecto,
  getProyectoExistente,
  getProyectosByUserID,
};
