const db = require("../config/db_sequelize");
const path = require("path");

module.exports = {
  async getCreate(req, res) {
    res.render("categoria/categoriaCreate");
  },
  async postCreate(req, res) {
    db.Categoria.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
    })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getList(req, res) {
    db.Categoria.findAll()
      .then((categorias) => {
        res.render("Categoria/CategoriaList", {
          categorias: categorias.map((user) => user.toJSON()),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
