const path = require("path");
const { fetchAll } = require("../models/proyectoModel");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel");
const Ejecuta = require("../models/ejecutaModel")
const Usuario = require("../models/usuarioModel");
const { request } = require("http");


//falta poner sesión
// es cuando quiero algo de la base de datos
getnuevaTarea = (request, response, next) => {
    console.log(request.session);
    Proyecto.fetchAll()
    .then(([rowsProyecto, fieldData])=> {
        Empleado.fetchAll()
        .then(([rowsEmpleado, fieldData]) => {
            return response.render(path.join("regTarea", "regTarea.ejs"), {
                proyecto:rowsProyecto,
                empleado:rowsEmpleado,
                listaPrivilegios: request.session.privilegios,
                
            });
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
    const nuevaTarea = new Tarea(request.body.nombreT, request.body.horasRegistradas, request.body.idProyecto);
    nuevaTarea.save()
    .then(()=> {
          Tarea.tareaMasReciente()
          .then(([rows, fieldData])=>{
            Tarea.asignarColaborador(request.session.idSesion, rows[0].idTarea)
              .then(()=>console.log("Tarea asignada a colaborador " + request.session.idSesion))
              .catch(err=>console.log(err));
            console.log(request.body.arrayColaboradores);
            for (colaborador of request.body.arrayColaboradores) {
              console.log(colaborador);
              let id_colaborador = colaborador;
              Tarea.asignarColaborador(id_colaborador, rows[0].idTarea)
                .then(()=>console.log("Tarea asignada a colaborador " + id_colaborador))
                .catch(err=>console.log(err)); // recuperar antes el idTarea
            }
            request.session.mensaje = "Tarea creada correctamente";
            response.status(200).json({mensaje: "Listo"});
            // mensaje de exit
          }).catch(err => console.log(err)); 
      }).catch(err => console.log(err));
    }

    // aqui paso mensaje en el template de a vista ver tareas y en la vista digo si esta variable se encuetra imprimo el mensaje
getTareas = (request, response, next) => {
     // creo la variable de sesion para el mensaje de exito
     let mensaje = request.session.mensaje ? request.session.mensaje : '';
     request.session.mensaje = '';

    Tarea.fetchTareas()
    .then(([rowsTarea, fieldData]) => {
        Empleado.fetchAll()
        .then(([rowsEmpleados]) => {
            response.render(path.join("verTareas", "verTareas.ejs"), {
            tarea: rowsTarea,
            empleados: rowsEmpleados,
            listaPrivilegios: request.session.privilegios,
            idSesion: request.session.idSesion,
            // paso el mensaje a el template
            mensaje: mensaje,
        })
        })
    })
    .catch(err => console.log(err))
};

getBuscar = (request, response, next) => {

    Tarea.buscar(request.session.idSesion, request.params.fechaInicio, request.params.fechaFin)
        .then(([rows, fieldData]) => {
            console.log("Los datos son:",rows)
            response.status(200).json({fecha: rows});
        })
        .catch(err => { 
            console.log(err);
            response.status(500).json({message: "ERROR 500"});
        });
};

getHorasXtarea = async (request, response, next) => {
    let tareas;
    await Proyecto.horasTotales(request.params.idProyecto)
    .then( async ([rowsHoras, fielData]) => {
        await Proyecto.getTareas(request.params.idProyecto)
            .then( async ([rowsTarea, fillData]) => {
                console.log(rowsTarea);
                for(let tarea of rowsTarea){
                    [rowsColab, fieldData] = await Tarea.getColaboradores(tarea.idTarea);
                    tarea.colaboradores = rowsColab;
                }
                console.log(rowsHoras[0]);
                tareas = rowsTarea;
                proyecto = rowsHoras;
            });

        response.render(path.join("horasXtarea", "horasXtarea.ejs"), {
            tarea: tareas,
            listaPrivilegios: request.session.privilegios,
        })
    })
}

// postBorrarTarea = (request, response, next) => {
//     Tarea.getTodoTarea(request.body.idTarea)
//     .then(([rowsTarea, fielData]) => {
//         Tarea.borrar(rows[0])
//         .then(() => {
//             response.redirect('/user/inicio');
//         })
//         .catch(err =>{
//             console.log(err);
//         })
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

getEditarTarea = (request, response, next) => {
    Tarea.getTodoTarea(request.params.idTarea)
    .then(([rowsTarea, fielData]) =>{
        Empleado.fetchAll()
        .then(([rowsEmplead, fielData]) => {
            response.render(path.join("editarTarea", "editarTarea.ejs"), {
                tarea: rowsTarea,
                empleado: rowsEmplead,
                listaPrivilegios: request.session.privilegios,
            })
        });
    })
}
 
postEditarTarea = (request, response, next) => {
//  //update
//  const nuevaTarea = new Tarea(request.body.nombreT, request.body.horasRegistradas);
//     nuevaTarea.save()
//     .then(()=> {
//         Tarea.tareaMasReciente()
//         .then(([rows, fieldData])=>{
//             Tarea.asignarColaborador(request.session.idSesion, rows[0].idTarea)
//             .then(()=>console.log("Tarea asignada a colaborador " + request.session.idSesion))
//             .catch(err=>console.log(err));
//             console.log(request.body.arrayColaboradores);
//             for (colaborador of request.body.arrayColaboradores) {
//                 console.log(colaborador);
//                 let id_colaborador = colaborador;
//                 Tarea.asignarColaborador(id_colaborador, rows[0].idTarea)
//                 .then(()=>console.log("Tarea asignada a colaborador " + id_colaborador))
//                 .catch(err=>console.log(err)); // recuperar antes el idTarea
//             }
//             request.session.mensaje = "Tarea creada correctamente";
//             response.status(200).json({mensaje: "Listo"}); // MANDARLE EL OBJETO YA LISTO PARA EL CIENTE
                                                            // EN EL CLIENTE LEES EL OBJETO PARA SACAR EL ID DEL PROYECTO Y REDIRIGIR 
//             // mensaje de exit
//         }).catch(err => console.log(err)); 
//     }).catch(err => console.log(err));
}

module.exports = {
    getnuevaTarea,
    postnuevaTarea,
    getTareas,
    getBuscar,
    getHorasXtarea,
    getEditarTarea,
    postEditarTarea,
};
