const path = require("path");
const { fetchAll } = require("../models/proyectoModel");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel")

// es cuabdo quiero algo de la base de datos
getnuevaTarea = (request, response, next) => {
    console.log(request.session)
    Proyecto.fetchAll()
    .then(([rowsProyecto, fieldData])=> {
        Empleado.fetchAll()
        .then(([rowsEmpleado, fieldData]) => {
            response.render(path.join("regTarea", "regTarea.ejs"), {
                // aqui mando los datos a la vista
                proyecto:rowsProyecto,
                empleado:rowsEmpleado
            })
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
};

postnuevaTarea = (request, response, next) => {
    const nuevaTarea = new Tarea(request.body.nombreT, request.body.horasRegistradas, 2);
    console.log(nuevaTarea);
    nuevaTarea.save()
    .then((result) => {
        response.status(200).json({
            salida:"exitoso"
        })
    
        .catch((err) => {
            console.log(err)
        })
    })
}

module.exports = {
    getnuevaTarea,
    postnuevaTarea
  };
  
