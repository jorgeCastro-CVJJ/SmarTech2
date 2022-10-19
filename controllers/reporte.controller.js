const path = require("path");
const Proyecto = require("../models/proyectoModel");
const Tarea  = require("../models/tareaModel");
const Empleado = require("../models/empleadoModel");
const Usuario = require("../models/usuarioModel");
const Reporte = require("../models/reporteModel");
const PDF = require("pdfkit-construct");
const { response } = require("express");

postnuevoReporte = (request, response, next) => {
    Reporte.fetchHoras()
    .then(([rowsReporte, fieldData]) => {
        return response.render(path.join("reporte", "crearReporte"), {
            horas: rowsReporte,
            listaPrivilegios: request.session.privilegios
       });
//    })
    })
    .catch(err => { 
        console.log(err)
    });
}

getReportes = (request, response, next) => {
    let mensaje = request.session.mensaje ? request.session.mensaje : '';
     request.session.mensaje = '';
    // Reporte.fetchHorasReporte(request.session.idSesion, request.params.fechaInicio, request.params.fechaFin)
    Reporte.fetchReporte()
    .then(([rowsRep, fieldData]) => {
        console.log("Datos de filas:", rowsRep)
        return response.render(path.join("reporte", "modificarCrearReporte"), {
            reporte: rowsRep,
            listaPrivilegios: request.session.privilegios,
            mensaje: mensaje,
        });
    })
    .catch(err => {
        console.log(err)
    });
}

postReporte = (request, response, next) => {
    const nuevoReporte = new Reporte(request.body.porcentaje, request.body.horasVacaciones, request.body.personalCompletoT, request.body.personalMedioT, request.body.descripcion, request.body.fechaInicio, request.body.fechaFinal);
    nuevoReporte.save()
    .then(() => {
        console.log(nuevoReporte)
    })
    .catch(err => {
        console.log(err)
    });
}

getBuscarReporte = (request, response, next) => {

    Reporte.buscarReporteFecha(request.params.fechaInicio, request.params.fechaFinal)
        .then(([rows, fieldData]) => {
            Reporte.fetchReporte()
            .then(([rowsRep, fieldData]) => {
                 console.log("Los datos del reporte son:", rows);
                 console.log("Rows rep", rowsRep)
            response.status(200).json({fecha: rows, reporte: rowsRep});
            
            })
        })
        .catch(err => { 
            console.log(err);
            response.status(500).json({message: "ERROR 500"});
        });
};

getPDF = async(request, responde, next) => {
        const doc = new PDF({bufferPages: true});

        const filename =`reporteSemanal.pdf`;

        const stream = responde.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=${filename}`
        });
        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        doc.setDocumentHeader({
            height: '15'
        }, () => {
            doc
            .image(path.join( "public", "media", "logo.png"), 50, 45, {width: 50})
            .fillColor("#20BA4F")
            .fontSize(30)
            .text("NatGas", 110, 57)
            .fontSize(10)
            .text(`noReporte: ${reporteFinal.noReporte}`, 200, 50, {align: "right"})
            .text(`Fecha Inicial: ${reporteFinal.fechaInicio}`, 200, 65, {align: "right"})
            .text(`Fecha Final: ${reporteFinal.fechaFinal}`, 200, 80, {align: "right"})
            .moveDown();
        });

        const datosPDF = [
            {
                Proyecto: 1,
                horasRegistradas: 20,
                horasReales: 30
            }, 
            {
                Proyecto: 2,
                horasRegistradas: 60,
                horasReales: 20
            }
        ]

        doc.addTable([
            {key: 'Proyecto', label: 'Proyecto', align: 'left'},
            {key: 'horasRegistradas', label: 'Horas Registradas', align: 'left'},
            {key: 'horasReales', label: 'Horas Reales', align: 'left'}
        ], datosPDF,{
            border: null,
            width: "fill_body",
            striped: true,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 10,
            marginLeft: 45,
            marginRight: 45,
            headAlign: 'center'
        })
        doc.render();
        doc.end();
}

getReporteExistente = (request, response, next) =>{
    Reporte.fetchOne(request.params.noReporte)
    .then(([rowsReporte, fielData]) => {
        Reporte.fetchHoras()
        .then(([rowsHrs, fieldData])=> {
            Reporte.buscarReporteFecha(rowsReporte[0].fechaInicio, rowsReporte[0].fechaFinal)
            .then(([rowsHoras, fieldData]) => {  
                console.log("Las hrs son",rowsHoras)
                response.render(path.join('reporte', 'reportesExistentes.ejs'), {
                reporteN: rowsReporte,
                horas: rowsHoras,
                hrs: rowsHrs,
                listaPrivilegios: request.session.privilegios,   
                })            
            })
        })
    })
    .catch((err) => {
      console.log(err);
    })
  };

//porcentaje, horasVacaciones, personalCompletoT, personalMedioT, descripcion, noReporte

   postEditarReporte = (request, response, next) => {
     Reporte.fetchOne(request.params.noReporte)
         .then(([rowsRep, fielData]) => {
             (rowsRep[0].porcentaje = request.body.porcentaje),
                 (rowsRep[0].horasVacaciones = request.body.horasVacaciones),
                   (rowsRep[0].personalCompletoT = request.body.personalCompletoT),
                     (rowsRep[0].personalMedioT = request.body.personalMedioT),
                       (rowsRep[0].descripcion = request.body.descripcion),
                 //console.log(rowsTarea);
                 Reporte.postEditarReporte(
                     rowsRep[0].porcentaje,
                     rowsRep[0].horasVacaciones,
                     rowsRep[0].personalCompletoT,
                     rowsRep[0].personalMedioT,
                     rowsRep[0].descripcion,
                     rowsRep[0].noReporte,
                 )
                     .then(([]) => {
                        request.session.mensaje = "Reporte modificado correctamente";
                        response.status(200).json({mensaje: "Listo"});
                        //  response.status(200).json({ mensaje: 'Reporte editado correctamente'});
                     })
                     .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
 };

module.exports = {
    postnuevoReporte,
    getReportes,
    postReporte,
    getBuscarReporte,
    getPDF,
    getReporteExistente,
    postEditarReporte
}
