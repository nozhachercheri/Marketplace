module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "client",
    {
      idClient: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },

      nom:Sequelize.STRING,
      prenom:Sequelize.STRING,
      adresse:Sequelize.STRING,
      tel:Sequelize.STRING,
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
