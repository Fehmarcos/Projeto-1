module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    observacao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Ticket;
};
