// Si el usuario quiere accesar a alguna ruta donde el privilegio
// existe pero no lo tiene, lo regresa a user/inicio

module.exports = (request, response, next) => {
    if (request.session.privilegios.indexOf('RegTarea') != -1) {
        console.log(request.session.privilegios.indexOf('RegTarea'))
    } else {return response.status(403).redirect("/user/inicio");}
    next();
};