module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "boutique",
    {
      idBoutique: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.STRING
      },
      openTime: {
        type: Sequelize.STRING
      },
      closeTime: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
