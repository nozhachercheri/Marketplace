module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "stock",
      {

        qty:Sequelize.INTEGER,
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  