const { response } = require("express");
const path = require("path");

menu = (request, response, next) => {
  response.render("index.ejs");
};

module.exports = {
  menu,
};
