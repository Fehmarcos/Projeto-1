const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//Tabelas
db.Usuario = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Categoria = require('../models/relational/categoria.js')(sequelize, Sequelize);
db.Ticket = require('../models/relational/ticket.js')(sequelize, Sequelize);
//Relacionamentos
db.Usuario.hasMany(db.Ticket)
module.exports = db;

