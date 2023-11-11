const express = require("express");
const db = require("../config/db_sequelize");
const controllerCategoria = require("../controllers/controllerCategoria");
const controllerTicket = require("../controllers/controllerTicket");
const controllerUsuario = require("../controllers/controllerUsuario");
const route = express.Router();
//const cookies = require('cookie-parser');


// db.sequelize.sync({force: true}).then(() => {
//     console.log('{ force: true }');
// });

// db.Usuario.create({login:'1', senha:'1', tipo:0});

module.exports = route;

//Home
route.get("/home", function (req, res) {
  res.render("home");
});

//categoria
route.get("/categoriaCreate", controllerCategoria.getCreate);
route.post("/categoriaCreate", controllerCategoria.postCreate);
route.get("/categoriaList", controllerCategoria.getList);
//ticket
// route.get("/ticketCreate", controllerTicket.getCreate);
// route.post("/ticketCreate", controllerTicket.postCreate);
// route.get("/ticketList", controllerTicket.getList);

//Controller Usuario
//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
//Usuario - Sign-up
route.get("/signup", controllerUsuario.getSignin);
route.post("/signup", controllerUsuario.postSignin);
//Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
