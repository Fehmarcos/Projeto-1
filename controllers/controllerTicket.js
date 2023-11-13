const { log } = require("console");
const db = require("../config/db_sequelize");
const path = require("path");
const { Op } = require("sequelize");
const tecnico = require("../models/relational/tecnico");

module.exports = {
  async getCreate(req, res) {
    var categoria = await db.Categoria.findAll();
    res.render("ticket/ticketCreate", { categoria });
  },
  async postCreate(req, res) {
    db.Ticket.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      categoriumId: req.body.categoriaId,
      usuarioId: req.cookies.usuarioId,
      status: "Pendente",
    })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getList(req, res) {
    if (req.cookies.tipo == 0) {
      tickets = await db.Ticket.findAll({
        include: [{ model: db.Categoria }],
      });
    } else if (req.cookies.tipo == 1) {
      var tecnico = await db.Tecnico.findAll({
        where: [{ usuarioId: req.cookies.usuarioId }],
      });
      tickets = await db.Ticket.findAll({
        include: [{ model: db.Categoria }],
        where: {
          tecnicoId: tecnico[0].dataValues.id,
          status: { [Op.notILike]: "pronto" },
        },
      });
    } else {
      tickets = await db.Ticket.findAll({
        include: [{ model: db.Categoria }],
        where: { usuarioId: req.cookies.usuarioId },
      });
    }
    res.render("Ticket/ticketList", {
      tickets: tickets.map((user) => user.toJSON()),
    });
  },
  async getUpdate(req, res) {
    var categoria = await db.Categoria.findAll();
    var tecnico = await db.Tecnico.findAll({ include: [db.Usuario] });
    await db.Ticket.findByPk(req.params.id)
      .then((ticket) =>
        res.render("ticket/ticketUpdate", {
          ticket: ticket.dataValues,
          categoria: categoria.map((c) => c.toJSON()),
          tecnico: tecnico.map((t) => t.toJSON()),
        })
      )
      .catch(function (err) {
        console.log(err);
      });
  },
  async postUpdate(req, res) {
    await db.Ticket.update(req.body, { where: { id: req.body.id } })
      .then(res.redirect("/home"))
      .catch(function (err) {
        console.log(err);
      });
  },
  async getDelete(req, res) {
    await db.Ticket.destroy({ where: { id: req.params.id } })
      .then(res.redirect("/home"))
      .catch((err) => {
        console.log(err);
      });
  },
};
