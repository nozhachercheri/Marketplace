module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "couleur",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nomC:Sequelize.STRING,
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  