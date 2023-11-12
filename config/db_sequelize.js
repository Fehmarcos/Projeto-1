const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//Tabelas
db.Usuario = require("../models/relational/usuario.js")(sequelize, Sequelize);
db.Tecnico = require("../models/relational/tecnico.js")(sequelize, Sequelize);
db.Categoria = require("../models/relational/categoria.js")(sequelize,Sequelize);
db.Ticket = require("../models/relational/ticket.js")(sequelize, Sequelize);

//Relacionamentos
// Usuario / Tecnico (1x1)
db.Usuario.hasOne(db.Tecnico, {onDelete: 'CASCADE'});
db.Tecnico.belongsTo(db.Usuario);
//Categoria / Ticket (1xn)
db.Categoria.hasMany(db.Ticket,);
db.Ticket.belongsTo(db.Categoria);
//Usuario / Ticket (1xn)
db.Usuario.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Usuario);
//Tecnico / Ticket (1xn)
db.Tecnico.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Tecnico);

module.exports = db;
