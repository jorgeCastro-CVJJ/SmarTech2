// si no ha hecho el login no puede pasar a ninguna otra ruta

module.exports = (request, response, next) => {
  if (!request.session.isLoggedIn) {
    return response.status(403).redirect("/user/login");
  }
  next();
};
