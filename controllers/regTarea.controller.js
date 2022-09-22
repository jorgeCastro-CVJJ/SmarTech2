const path = require("path");
const { fetchAll } = require("../models/proyectoModel");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel")
//falta poner sesión
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
    const nuevaTarea = new Tarea(request.body.nombreT, request.body.horasRegistradas, request.body.nombreP);
    nuevaTarea.save()
        .then(()=> {
            if (request.body.arrayColaboradores.length >= 1) {
                Tarea.tareaMasReciente()
                    .then(([rows, fieldData])=>{
                        console.log(request.body.arrayColaboradores);
                        for (colaborador of request.body.arrayColaboradores) {
                            console.log(colaborador);
                            let id_colaborador = colaborador;
                            Tarea.asignarColaborador(id_colaborador, rows[0].idTarea)
                                .then(()=>console.log("Tarea asignada a colaborador " + id_colaborador))
                                .catch(err=>console.log(err)); // recuperar antes el idTarea
                        }
                        response.status(200).json({mensaje: "Listo"});
                    }).catch(err => console.log(err)); 
                //request.session.mensaje = "Tarea creada exitosamente";
            } else{
                console.log("else del if");
            }
        }).catch(err => console.log(err));
};

getTareas = (request, response, next) => {
    Tarea.fetchTareas()
    .then(([rowsTarea, fieldData]) => {
        response.render(path.join("verTareas", "verTareas.ejs"), {
            tarea: rowsTarea,
        })
    })
    .catch(err => console.log(err))
};

// menu = (request, response, next) => {
//     console.log(request.session.privilegios);
//     return response.render("index.ejs",{listaPrivilegios: request.session.privilegios});
//   };

module.exports = {
    getnuevaTarea,
    postnuevaTarea,
    getTareas
  };
  
