const path = require("path");
const RegTarea = require("../models/regTareaModel");

getTarea = (request, response, next) => {
  response.render(path.join("regTarea", "regTarea.ejs"), {
    isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
  });
};

