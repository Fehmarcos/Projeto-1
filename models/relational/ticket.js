
module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define('ticket', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING, allowNull: false
        },
        descricao: {
            type: Sequelize.STRING, allowNull: false
        },
        observacao: {
            type: Sequelize.STRING, allowNull: true
        },
        categoriaid: {
            type: Sequelize.STRING, allowNull: false
        },
        usuarioid: {
            type: Sequelize.INTEGER, allowNull: false
        },
        tenicoid: {
            type: Sequelize.INTEGER, allowNull: true
        }
    });
    return Usuario;
}