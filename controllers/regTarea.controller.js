const path = require("path");
const RegTarea = require("../models/regTareaModel");

exports.getTarea = (request, response, next) => {

  Equipo.fetchAll()
      .then(([rows, fieldData]) => {
          console.log(rows);
          response.render(path.join('regTarea', 'regTarea.ejs'), {
              nombreP: rows,
              isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
          });
      })
      .catch(err => {
          console.log(err);
          response.render('error.ejs');
      });
  
};