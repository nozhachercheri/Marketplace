module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "commande",
    {
      idC: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tailleId:Sequelize.INTEGER,
      couleurId:Sequelize.INTEGER,
      qty:Sequelize.INTEGER,
      date:Sequelize.STRING,
      etat: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
