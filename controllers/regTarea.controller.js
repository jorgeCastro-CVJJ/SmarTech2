const path = require("path");
const { fetchAll } = require("../models/regTareaModel");
const RegTarea = require("../models/regTareaModel");

getTarea = (request, response, next) => {
    response.render(path.join("regTarea", "regTarea.ejs"), {
      isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
    });
};

postTarea = (request, response, next) => {
    const tarea = new RegTarea(request.body.nombreT);
    tarea.save()
    .then(() => {
        RegTarea.fechAll()
        .then(([rows, fieldData]) => {
            response.render(path.join('regTarea', 'regTarea.ejs'), {
                nombreP: rows,
                nombreT: rows,
                horasTrabajo : rows,
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
            })
        });
    })
    .catch(err => {
        response.render('error.ejs', {
            isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false
        });
    });
};


  

  
module.exports = {
    getTarea,
    postTarea
  };
  
