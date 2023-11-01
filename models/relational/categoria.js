
module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categoria', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        texto: {
            type: Sequelize.STRING, allowNull: false
        },
        descricao: {
            type: Sequelize.STRING, allowNull: false
        }
    });
    return Categoria;
}