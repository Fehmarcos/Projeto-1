const { log } = require("console");
const db = require("../config/db_sequelize");
const path = require("path");
const { Op } = require("sequelize");

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
    let tickets;

    if (req.cookies.tipo == 0) {
      tickets = await db.Ticket.findAll({
        include: [{ model: db.Categoria }],
      });
    } else {
      tickets = await db.Ticket.findAll({
        include: [{ model: db.Categoria }],
        where: {
          [Op.or]: [
            { usuarioId: req.cookies.usuarioId },
            {
              [Op.and]: [
                {
                  tecnicoId: req.cookies.usuarioId,
                  status: { [Op.notILike]: "pronto" },
                },
              ],
            },
          ],
        },
      });
    }
    res.render("Ticket/ticketList", {
      tickets: tickets.map((user) => user.toJSON()),
    });
  },
  /* async getCreate(req, res) {
    var categoria = await db.Categoria.findAll();
    res.render("ticket/ticketCreate", { categoria });
  }, */
  async getUpdate(req, res) {
    var categoria = await db.Categoria.findAll();
    var tecnico = await db.Usuario.findAll({ where: { tipo: 2  } });
    await db.Ticket.findByPk(req.params.id)
      .then((ticket) =>
        res.render("ticket/ticketUpdate", {
          ticket: ticket.dataValues,
          categoria,
          tecnico,
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
