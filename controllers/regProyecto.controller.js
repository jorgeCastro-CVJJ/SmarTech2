const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Empleado = require("../models/empleadoModel")

getnuevoProyecto = (request, response, next) =>{
  console.log(request.session);
  Empleado.fetchAll()
  .then(([rowsEmpleado, fielData]) =>{
    response.render(path.join('regProyecto', 'regProyecto.ejs'), {
      empleado:rowsEmpleado,
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
    if (request.body.arrayColaboradores.length >= 1) {
      Proyecto.proyectoMasReciente()
      .then(([rows, fieldData])=>{
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
    } else{
      console.log("else del if");
    }
  }).catch(err => console.log(err));
}



module.exports = {
  getnuevoProyecto,
  postnuevoProyecto
};
