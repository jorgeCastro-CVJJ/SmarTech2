// Si el usuario quiere accesar a alguna ruta donde el privilegio
// existe pero no lo tiene, lo regresa 

module.exports = (request, response, next) => {
    if (request.session.privilegios.indexOf('ConsultarHorasProyecto') != -1) {
        console.log(request.session.privilegios.indexOf('ConsultarHorasProyecto'))
    } else {return response.status(403).redirect("/user/inicio");}
    next();
};