module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "taille",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nomT: Sequelize.STRING,
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
};
