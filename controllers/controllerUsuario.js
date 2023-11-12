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
          res.cookie("usuarioId", usuarios[0].id);
          res.redirect("/home");
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
    const usuario = await db.Usuario.create({
      login: req.body.login,
      senha: req.body.senha,
      tipo: req.body.tipo,
    });
    if (req.body.tipo == 1) {
      const tecnico = await db.Tecnico.create({
        usuarioId: usuario.id,
      });
    }
    res.redirect("/home");
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
      .then((usuario) => {
        res.cookie("tipo", 2);
        res.cookie("usuarioId", usuario.dataValues.id);
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getDelete(req, res) {
    await db.Usuario.destroy({ where: { id: req.params.id } })
      .then(res.redirect("/home"))
      .catch((err) => {
        console.log(err);
      });
  },
};
