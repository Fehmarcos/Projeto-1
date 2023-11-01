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
db.Tecnico = require('../models/relational/tecnico.js')(sequelize, Sequelize);
db.Categoria = require('../models/relational/categoria.js')(sequelize, Sequelize);
db.Ticket = require('../models/relational/ticket.js')(sequelize, Sequelize);

//Relacionamentos
db.Usuario.hasOne(db.Tecnico)
db.Categoria.hasMany(db.Ticket)
db.Usuario.hasMany(db.Ticket)
db.Tecnico.hasMany(db.Ticket)
module.exports = db;

