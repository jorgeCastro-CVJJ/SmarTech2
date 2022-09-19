const path = require("path");
const { fetchAll } = require("../models/proyectoModel");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel")

// es cuabdo quiero algo de la base de datos
getnuevaTarea = (request, response, next) => {
    console.log(request.session);
    Proyecto.fetchAll()
    .then(([rowsProyecto, fieldData])=> {
        Empleado.fetchAll()
        .then(([rowsEmpleado, fieldData]) => {

            let mensaje = request.session.mensaje ? request.session.mensaje : '';
            request.session.mensaje = '';

            response.render(path.join("regTarea", "regTarea.ejs"), {
                // aqui mando los datos a la vista
                proyecto:rowsProyecto,
                empleado:rowsEmpleado,
                // mensaje: mensaje,
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
    nuevaTarea.save()
    .then((result) => {
        //request.session.mensaje = "Tarea creada exitosamente";
        console.log(result);

    })
    // iterar con colaboradores pr cada valor en el arreay se haga la asginacion de la tarea con el colaborador
    console.log(request.body.arrayColaboradores)
    if (!Array.isArray(request.body.arrayColaboradores))
    request.body.arrayColaboradores = [request.body.arrayColaboradores];
    for (colaborador of request.body.arrayColaboradores) 
        {
          Tarea.asignarColaborador(colaborador, request.body.idTarea)
        }

}



module.exports = {
    getnuevaTarea,
    postnuevaTarea
  };
  
