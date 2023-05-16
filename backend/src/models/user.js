module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      login:Sequelize.STRING,
      email: Sequelize.STRING,
      motDePasse: Sequelize.STRING
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
