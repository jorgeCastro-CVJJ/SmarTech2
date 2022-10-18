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
            
            for (colaborador of request.body.arrayColaboradores) {
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
                for(let tarea of rowsTarea){
                    [rowsColab, fieldData] = await Tarea.getColaboradores(tarea.idTarea);
                    tarea.colaboradores = rowsColab;
                }
                tareas = rowsTarea;
                proyecto = rowsHoras;
            });

        console.log(tareas);

        response.render(path.join("horasXtarea", "horasXtarea.ejs"), {
            tarea: tareas,
            listaPrivilegios: request.session.privilegios,
        })
    })
}

borrarColaborador = (request, response, next) => {
    Tarea.getIdTarea(request.params.id)
    .then(([rowsID, fieldata])=>{
        Tarea.borrarColaborador(request.params.id)
        .then(() => {
            response.redirect("/tarea/editar/" + rowsID[0].idTarea);
        });
    });
}

agregarColaborador = (request, response, next) => {
    
    Tarea.asignarColaborador(request.params.idEmpleado, request.params.idTarea)
        .then(() => {
            response.redirect("/tarea/editar/" + request.params.idTarea);
        });
}

getEditarTarea = (request, response, next) => {
    // devolver las tareas
    // los colaboradores de la tarea
    Tarea.getTodoTarea(request.params.idTarea)
    .then(([rowsTarea, fielData]) =>{
        Empleado.getEmpleadosNoRegistrados(request.params.idTarea)
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
    Tarea.getUnaTarea(request.params.idTarea)
        .then(([rowsTarea, fielData]) => {
            (rowsTarea[0].nombreT = request.body.nombreT),
                (rowsTarea[0].horasTrabajo = request.body.horasRegistradas),
                //console.log(rowsTarea);
                Tarea.editarTablaTarea(
                    rowsTarea[0].nombreT,
                    rowsTarea[0].horasTrabajo,
                    rowsTarea[0].idTarea
                )
                    .then(([rowsTarea, fielData]) => {
                        response.status(200).json({ mensaje: 'Tarea editada correctamente', idProyecto: rowsTarea[0].idProyecto });
                    })
                    .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

borrarTarea = (request, response, next) => {
    Tarea.getIdBorrar(request.params.idTarea)
    .then(([rowsID, fieldata]) => {
        Tarea.borrarTarea(request.params.idTarea)
        .then(() => {
            response.redirect("/tarea/horasTarea/" + rowsID[0].idProyecto)
        })
    })
}


module.exports = {
    getnuevaTarea,
    postnuevaTarea,
    getTareas,
    getBuscar,
    getHorasXtarea,
    getEditarTarea,
    postEditarTarea,
    borrarColaborador,
    agregarColaborador,
    borrarTarea,
};
