module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "marque",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nomM:Sequelize.STRING,
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  