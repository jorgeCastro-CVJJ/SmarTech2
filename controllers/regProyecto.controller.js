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
  const nuevoProyecto = new Proyecto(request.body.nombreProyecto, request.body.descripcion, request.body.estatus, request.body.stackTecnologico,request.body.stakeholders);
  console.log(nuevoProyecto);
  nuevoProyecto.save().then((result) => {
    response.status(200).json({
      salida: "exitoso"
    })
    .catch((err) => {
      console.log(err)
    })
  })
  
}



module.exports = {
  getnuevoProyecto,
  postnuevoProyecto
};
