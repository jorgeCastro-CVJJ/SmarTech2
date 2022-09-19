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

postnuevaTarea = async (request, response, next) => {
    
    const nuevaTarea = new Tarea(request.body.nombreT, request.body.horasRegistradas, 2);
    nuevaTarea.save()
    .then((result) => {
        //request.session.mensaje = "Tarea creada exitosamente";
        if (!Array.isArray(request.body.arrayColaboradores))
        request.body.arrayColaboradores = [request.body.arrayColaboradores];
        console.log("si entro");
        let tareaReciente = await Tarea.tareaMasReciente();
        .then((result) => {
            console.log(tareaReciente[0]);
            for (colaborador of request.body.arrayColaboradores) {
              await Tarea.asignarColaborador(colaborador, request.body.idTarea) // recuperar antes el idTarea
            }
            await Tarea.colaboradorDeTarea(tareaReciente);
        })
    })
}



module.exports = {
    getnuevaTarea,
    postnuevaTarea
  };
  
