const db = require("../config/db_sequelize");
const path = require("path");

module.exports = {
  async getLogin(req, res) {
    res.render("usuario/login", { layout: "noMenu.handlebars" });
  },
  async postLogin(req, res) {
    db.Usuario.findAll({
      where: { login: req.body.login, senha: req.body.senha },
    })
      .then((usuarios) => {
        if (usuarios.length > 0) {
          res.cookie("tipo", usuarios[0].tipo);
          res.cookie("login", usuarios[0].login);
          res.redirect("/home");
          //res.render('home', { usuario: usuarios[9] });
        } else res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getCreate(req, res) {
    res.render("usuario/usuarioCreate");
  },
  async postCreate(req, res) {
    db.Usuario.create({
      login: req.body.login,
      senha: req.body.senha,
      tipo: req.body.tipo,
    })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getList(req, res) {
    db.Usuario.findAll()
      .then((usuarios) => {
        res.render("usuario/usuarioList", {
          usuarios: usuarios.map((user) => user.toJSON()),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getSignin(req, res) {
    res.render("usuario/signup", { layout: "noMenu.handlebars" });
  },
  async postSignin(req, res) {
    db.Usuario.create({
      login: req.body.login,
      senha: req.body.senha,
      tipo: 2,
    })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
